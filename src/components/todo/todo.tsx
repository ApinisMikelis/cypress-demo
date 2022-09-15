import { FC } from 'react';

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
  return (
    <div className="todo">
      <p>{todo.done ? 'done' : 'to be done'}</p>
      <h2>{todo.title}</h2>
      <p>{todo.description}</p>
      <time>{todo.created_at}</time>
    </div>
  );
};
