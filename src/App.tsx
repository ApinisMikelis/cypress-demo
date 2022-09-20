import React, { useEffect, useState } from 'react';
import { Todo, TodoModel } from './components/todo/todo';
import { supabase } from './supabaseClient';
import { PostgrestError } from '@supabase/supabase-js';
import { AddTodo } from './components/add-todo/AddTodo';

function App() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<PostgrestError>();
  const [todos, setTodos] = useState<TodoModel[]>([]);

  useEffect(() => {
    loadTodos().then((todos) => setTodos(todos));
  }, []);

  const loadTodos = async (): Promise<TodoModel[]> => {
    let serverTodos: TodoModel[] = [];

    try {
      setLoading(true);

      let { data, error, status } = await supabase
        .from('todos')
        .select(`id, title, description, done, created_at`);

      if (error && status !== 406) {
        setError(error);
      }

      if (data) {
        serverTodos = data;
      }
    } finally {
      setLoading(false);
    }

    return serverTodos;
  };

  return (
    <div className="App">
      {loading && <p>loading...</p>}
      {error && <p>{error.message}</p>}
      {todos.length > 0 &&
        todos.map((todo) => {
          return <Todo key={todo.id} todo={todo} />;
        })}
      <AddTodo />
    </div>
  );
}

export default App;
