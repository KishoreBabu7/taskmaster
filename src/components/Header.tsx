import React from 'react';
import { Moon, Sun, CheckSquare } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="py-4 mb-8">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <CheckSquare className="text-indigo-500 dark:text-indigo-400" size={28} />
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">TaskMaster</h1>
        </div>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? (
            <Moon className="text-gray-700\" size={20} />
          ) : (
            <Sun className="text-yellow-300" size={20} />
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;