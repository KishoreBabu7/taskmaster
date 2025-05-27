import React, { useState } from 'react';
import { Check, Pencil, Trash2, X, Save, Star } from 'lucide-react';
import { Todo, useTodo } from '../context/TodoContext';
import { useTheme } from '../context/ThemeContext';

interface TodoItemProps {
  todo: Todo;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const { toggleTodo, deleteTodo, editTodo } = useTodo();
  const { theme } = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [editPriority, setEditPriority] = useState<Todo['priority']>(todo.priority);
  const [editCategory, setEditCategory] = useState(todo.category || '');

  const handleToggle = () => {
    toggleTodo(todo.id);
  };

  const handleDelete = () => {
    deleteTodo(todo.id);
  };

  const startEditing = () => {
    setIsEditing(true);
    setEditText(todo.text);
    setEditPriority(todo.priority);
    setEditCategory(todo.category || '');
  };

  const cancelEditing = () => {
    setIsEditing(false);
  };

  const saveEdit = () => {
    editTodo(todo.id, editText, editPriority, editCategory || undefined);
    setIsEditing(false);
  };

  const priorityColors = {
    low: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    medium: 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200',
    high: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div 
      className={`relative mb-4 p-4 rounded-lg backdrop-blur-sm transition-all duration-300 ${
        todo.completed 
          ? 'bg-white/50 dark:bg-gray-800/50' 
          : 'bg-white/90 dark:bg-gray-800/90'
      } ${
        theme === 'light' 
          ? 'shadow-lg hover:shadow-xl' 
          : 'shadow-lg hover:shadow-gray-700'
      }`}
    >
      {!isEditing ? (
        <>
          <div className="flex items-start gap-3">
            <button
              onClick={handleToggle}
              className={`flex-shrink-0 w-6 h-6 mt-1 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                todo.completed 
                  ? 'bg-indigo-500 border-indigo-500 dark:bg-indigo-400 dark:border-indigo-400'
                  : 'border-gray-300 dark:border-gray-500 hover:border-indigo-400 dark:hover:border-indigo-400'
              }`}
            >
              {todo.completed && <Check size={14} className="text-white" />}
            </button>
            <div className="flex-grow">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span 
                  className={`text-lg ${
                    todo.completed 
                      ? 'line-through text-gray-500 dark:text-gray-400' 
                      : 'text-gray-800 dark:text-gray-200'
                  }`}
                >
                  {todo.text}
                </span>
                <span className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 ${priorityColors[todo.priority]}`}>
                  <Star size={12} />
                  {todo.priority}
                </span>
                {todo.category && (
                  <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    {todo.category}
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {formatDate(todo.createdAt)}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={startEditing}
                className="p-1.5 rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-400 transition-colors"
                aria-label="Edit task"
              >
                <Pencil size={16} />
              </button>
              <button
                onClick={handleDelete}
                className="p-1.5 rounded-full text-gray-500 hover:bg-red-100 dark:hover:bg-red-900 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                aria-label="Delete task"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="space-y-3">
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            autoFocus
          />
          <div className="flex flex-col sm:flex-row gap-2">
            <select
              value={editPriority}
              onChange={(e) => setEditPriority(e.target.value as Todo['priority'])}
              className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>
            <input
              type="text"
              placeholder="Category (optional)"
              value={editCategory}
              onChange={(e) => setEditCategory(e.target.value)}
              className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              onClick={cancelEditing}
              className="p-2 rounded-lg text-gray-700 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              <X size={16} />
            </button>
            <button
              onClick={saveEdit}
              className="p-2 rounded-lg text-white bg-indigo-500 hover:bg-indigo-600 dark:bg-indigo-600 dark:hover:bg-indigo-700 transition-colors"
            >
              <Save size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoItem;