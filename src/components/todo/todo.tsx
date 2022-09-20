import { FC, useState } from 'react';
import { supabase } from '../../supabaseClient';

export interface TodoModel {
  id: number;
  title: string;
  description: string;
  done: boolean;
  created_at: string;
}

type Props = {
  todo: TodoModel;
};

export const Todo: FC<Props> = ({ todo }) => {
  const [loading, setLoading] = useState<boolean>(false);

  const deleteTodo = async (): Promise<any> => {
    try {
      setLoading(true);

      const { status } = await supabase
        .from('todos')
        .delete()
        .match({ id: todo.id });

      return status;
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="todo">
      <p>{todo.done ? 'done' : 'to be done'}</p>
      <h2>{todo.title}</h2>
      <p>{todo.description}</p>
      <time>{todo.created_at}</time>
      {!loading && (
        <button type="button" onClick={deleteTodo}>
          Delete
        </button>
      )}
    </div>
  );
};
