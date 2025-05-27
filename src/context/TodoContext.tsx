import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
  priority: 'low' | 'medium' | 'high';
  category?: string;
}

interface TodoContextType {
  todos: Todo[];
  filter: 'all' | 'active' | 'completed';
  addTodo: (text: string, priority: Todo['priority'], category?: string) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  editTodo: (id: string, text: string, priority: Todo['priority'], category?: string) => void;
  clearCompleted: () => void;
  setFilter: (filter: 'all' | 'active' | 'completed') => void;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text: string, priority: Todo['priority'], category?: string) => {
    if (text.trim()) {
      const newTodo: Todo = {
        id: crypto.randomUUID(),
        text: text.trim(),
        completed: false,
        createdAt: Date.now(),
        priority,
        category
      };
      setTodos([newTodo, ...todos]);
    }
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const editTodo = (id: string, text: string, priority: Todo['priority'], category?: string) => {
    if (text.trim()) {
      setTodos(
        todos.map((todo) =>
          todo.id === id
            ? { ...todo, text: text.trim(), priority, category }
            : todo
        )
      );
    }
  };

  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        filter,
        addTodo,
        toggleTodo,
        deleteTodo,
        editTodo,
        clearCompleted,
        setFilter,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodo = (): TodoContextType => {
  const context = useContext(TodoContext);
  if (context === undefined) {
    throw new Error('useTodo must be used within a TodoProvider');
  }
  return context;
};