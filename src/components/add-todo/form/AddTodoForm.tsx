import { FC } from 'react';
import { ErrorMessage, Field, Form, Formik, FormikErrors } from 'formik';

type AddTodoFormProps = {
  onSubmit: (todoDraft: DraftTodo) => void;
};

export interface DraftTodo {
  title: string;
  description: string;
}

export const AddTodoForm: FC<AddTodoFormProps> = ({ onSubmit }) => {
  const validate = (values: DraftTodo): any => {
    return !values.title ? { title: 'Required' } : null;
  };

  return (
    <Formik
      initialValues={{ title: '', description: '' }}
      validate={validate}
      onSubmit={onSubmit}>
      {({ isSubmitting }) => (
        <Form>
          <Field type="text" name="title" />
          <ErrorMessage name="title" component="div" />
          <Field type="text" name="description" />
          <ErrorMessage name="description" component="div" />
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};
