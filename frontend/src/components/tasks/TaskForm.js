import React, { useState } from 'react';
import Input from '../input/Input';
import Space from '../space/Space';
import Button from '../button/Button';
import Text from '../text/Text';
import {
  useCreateTaskMutation,
  useUpdateTaskMutation,
} from '../../slices/tasksApiSlice';
import toast from 'react-hot-toast';

function TaskForm({ data, onSuccess }) {
  const [taskValue, setTaskValue] = useState(data?.title);
  const [createTask] = useCreateTaskMutation();
  const [updateTask] = useUpdateTaskMutation();

  const handleOnSubmit = async e => {
    e.preventDefault();

    const task = { ...data, title: taskValue };

    try {
      if (data) {
        await updateTask(task).unwrap();
        toast.success('Updated');
      } else {
        await createTask(task).unwrap();
        toast.success('Created');
      }

      onSuccess();
    } catch (err) {
      console.error(err);
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div>
      <Text isTitle>{data ? 'Edit task' : 'New task'}</Text>

      <Space medium />

      <form onSubmit={handleOnSubmit}>
        <Input
          name='title'
          value={taskValue}
          placeholder='Introduce task description'
          onChange={({ value }) => setTaskValue(value)}
        />

        <Space medium />

        <div className='content-on-the-right'>
          <Button isPrimary type='submit'>
            {data ? 'Update task' : 'Create task'}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default TaskForm;
