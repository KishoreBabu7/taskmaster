import React, { useState } from 'react';
import { Plus, Sparkles } from 'lucide-react';
import { useTodo, Todo } from '../context/TodoContext';

const TodoInput: React.FC = () => {
  const { addTodo } = useTodo();
  const [text, setText] = useState('');
  const [priority, setPriority] = useState<Todo['priority']>('medium');
  const [category, setCategory] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      addTodo(text, priority, category || undefined);
      setText('');
      setPriority('medium');
      setCategory('');
      setIsExpanded(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 p-4">
        <div className="flex items-center gap-2">
          <div className="relative flex-grow">
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onFocus={() => setIsExpanded(true)}
              placeholder="Add a new task..."
              className="w-full p-3 pl-10 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white transition-all"
              aria-label="Add a new task"
            />
            <Sparkles className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-500 dark:text-indigo-400" size={18} />
          </div>
          <button
            type="submit"
            className="bg-indigo-500 hover:bg-indigo-600 text-white p-3 rounded-lg transition-all duration-200 flex items-center justify-center shadow-md hover:shadow-lg"
            aria-label="Add task"
          >
            <Plus size={20} />
          </button>
        </div>
        
        {isExpanded && (
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 animate-fadeIn">
            <div>
              <label htmlFor="priority" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Priority
              </label>
              <select
                id="priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value as Todo['priority'])}
                className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white transition-all"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Category (optional)
              </label>
              <input
                type="text"
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="e.g., Work, Personal, Shopping"
                className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white transition-all"
              />
            </div>
          </div>
        )}
      </div>
    </form>
  );
};

export default TodoInput;