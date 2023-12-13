import React from 'react';
import Text from '../text/Text';
import Space from '../space/Space';
import Button from '../button/Button';
import { useDeleteTaskMutation } from '../../slices/tasksApiSlice';
import toast from 'react-hot-toast';

function DeleteTaskForm({ task, onClose }) {
  const [deleteTask] = useDeleteTaskMutation();

  const handleDeleteTask = async () => {
    try {
      await deleteTask(task._id);
      toast.success('Deleted');
      onClose();
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div>
      <Text isTitle>Delete: {task.title}</Text>

      <Space small />

      <Text>Are you sure you want to delete this task?</Text>

      <Space medium />

      <div className='content-on-the-right'>
        <Button isSecondary onClick={onClose}>
          Cancel
        </Button>

        <Button isPrimary onClick={handleDeleteTask}>
          Delete task
        </Button>
      </div>
    </div>
  );
}

export default DeleteTaskForm;
