import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { TodoProvider } from './context/TodoContext';
import Header from './components/Header';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import TodoFilter from './components/TodoFilter';
import ParticleBackground from './components/ParticleBackground';
import './utils/animations.css';

function App() {
  return (
    <ThemeProvider>
      <TodoProvider>
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 dark:from-gray-900 dark:to-indigo-950 transition-colors duration-300">
          <ParticleBackground />
          <div className="container mx-auto max-w-3xl px-4 py-8">
            <div className="relative z-10">
              <Header />
              <main className="animate-fadeIn">
                <TodoInput />
                <TodoFilter />
                <TodoList />
              </main>
              <footer className="mt-12 text-center text-sm">
                <p className="text-gray-500 dark:text-gray-400">
                  Self Planner - Your beautiful task management app © {new Date().getFullYear()}
                </p>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  Made with <span className="text-red-500">♥</span> by{' '}
                  <a 
                    href="https://kishorebabutulugu.vercel.app" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors font-medium"
                  >
                    Kishore
                  </a>
                </p>
              </footer>
            </div>
          </div>
        </div>
      </TodoProvider>
    </ThemeProvider>
  );
}

export default App;
