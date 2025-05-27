import React from 'react';
import { useTodo } from '../context/TodoContext';

const TodoFilter: React.FC = () => {
  const { filter, setFilter, todos, clearCompleted } = useTodo();
  
  const activeCount = todos.filter(todo => !todo.completed).length;
  const completedCount = todos.filter(todo => todo.completed).length;

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 my-6 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 transition-all">
      <div className="flex items-center space-x-4">
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1 rounded-md transition-colors ${
            filter === 'all'
              ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200'
              : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300'
          }`}
        >
          All ({todos.length})
        </button>
        <button
          onClick={() => setFilter('active')}
          className={`px-3 py-1 rounded-md transition-colors ${
            filter === 'active'
              ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200'
              : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300'
          }`}
        >
          Active ({activeCount})
        </button>
        <button
          onClick={() => setFilter('completed')}
          className={`px-3 py-1 rounded-md transition-colors ${
            filter === 'completed'
              ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200'
              : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300'
          }`}
        >
          Completed ({completedCount})
        </button>
      </div>
      <div className="w-full sm:w-auto">
        <button
          onClick={clearCompleted}
          disabled={completedCount === 0}
          className={`px-3 py-1 rounded-md ${
            completedCount === 0
              ? 'bg-gray-200 text-gray-400 dark:bg-gray-700 dark:text-gray-500 cursor-not-allowed'
              : 'bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900 dark:text-red-200 dark:hover:bg-red-800'
          } transition-colors`}
        >
          Clear Completed
        </button>
      </div>
    </div>
  );
};

export default TodoFilter;