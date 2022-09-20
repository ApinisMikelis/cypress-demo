import { FC, useState } from 'react';
import { AddTodoForm, DraftTodo } from './form/AddTodoForm';
import { supabase } from '../../supabaseClient';

export const AddTodo: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const createTodo = async (draft: DraftTodo): Promise<void> => {
    try {
      setLoading(true);
      await supabase.from('todos').insert([{ ...draft }]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p>loading..</p>;
  }

  return <AddTodoForm onSubmit={createTodo} />;
};
