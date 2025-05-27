import React from 'react';
import { useTodo } from '../context/TodoContext';
import TodoItem from './TodoItem';

const TodoList: React.FC = () => {
  const { todos, filter } = useTodo();

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  // Sort todos by priority and then by creation date
  const sortedTodos = [...filteredTodos].sort((a, b) => {
    // First sort by completion status
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }
    
    // Then by priority
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    
    // Finally by creation date (newest first)
    return b.createdAt - a.createdAt;
  });

  return (
    <div className="space-y-2">
      {sortedTodos.length > 0 ? (
        sortedTodos.map((todo) => <TodoItem key={todo.id} todo={todo} />)
      ) : (
        <div className="text-center p-8 text-gray-500 dark:text-gray-400">
          <p className="text-xl font-medium mb-2">No tasks found</p>
          <p>
            {filter === 'all'
              ? "You haven't added any tasks yet. Add a new task to get started!"
              : filter === 'active'
              ? "You don't have any active tasks. Great job!"
              : "You don't have any completed tasks. Mark some tasks as completed!"}
          </p>
        </div>
      )}
    </div>
  );
};

export default TodoList;