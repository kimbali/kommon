import React, { useState } from 'react';
import TaskItem from '../components/tasks/TaskItem';
import Button from '../components/button/Button';
import {
  faEdit,
  faMagnifyingGlass,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import Space from '../components/space/Space';
import Input from '../components/input/Input';
import { useGetTasksQuery } from '../slices/tasksApiSlice';
import LoadingError from '../components/loadingError/LoadingError';
import Modal from '../components/modal/Modal';
import TaskForm from '../components/tasks/TaskForm';
import DeleteTaskForm from '../components/tasks/DeleteTaskForm';

function TasksConfig() {
  const [searchValue, setSearchValue] = useState('');
  const [keywordValue, setKeywordValue] = useState('');
  const [showFormModal, setShowFormModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  const handleSearchSubmit = e => {
    e.preventDefault();

    setKeywordValue(searchValue);
  };

  const { data, isLoading, isError, refetch } = useGetTasksQuery({
    keyword: keywordValue,
  });

  const onSuccessTask = () => {
    setShowFormModal(false);
    setCurrentTask(null);
    refetch();
  };

  const handleEdit = task => {
    setShowFormModal(true);
    setCurrentTask(task);
  };

  const handleDelete = () => {
    setShowDeleteModal(false);
    refetch();
  };

  if (isLoading || isError) {
    return <LoadingError isLoading={isLoading} isError={isError} />;
  }

  return (
    <div>
      <div className='content-left-and-right'>
        <Button isPrimary onClick={() => setShowFormModal(true)}>
          Add a task
        </Button>

        <form onSubmit={handleSearchSubmit} className='search-input'>
          <Input
            onChange={({ value }) => setSearchValue(value)}
            placeholder='Search by title'
            iconLeft={faMagnifyingGlass}
            isSecondary
            name='search'
            value={searchValue}
            type='search'
          />

          <Button type='submit' isPrimary iconLeft={faMagnifyingGlass} />
        </form>
      </div>

      <Space medium />

      <table>
        <tbody>
          {data.tasks.map((task, i) => (
            <tr key={`task-item-${i}`}>
              <td>{task.title}</td>
              <td className='only-icon'>
                <Button
                  onlyIcon
                  iconLeft={faEdit}
                  onClick={() => handleEdit(task)}
                />
              </td>
              <td className='only-icon'>
                <Button
                  onlyIcon
                  iconLeft={faTrash}
                  onClick={() => setShowDeleteModal(task)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showFormModal && (
        <Modal onClose={setShowFormModal}>
          <TaskForm onSuccess={onSuccessTask} data={currentTask} />
        </Modal>
      )}

      {showDeleteModal && (
        <Modal onClose={setShowDeleteModal}>
          <DeleteTaskForm onClose={handleDelete} task={showDeleteModal} />
        </Modal>
      )}

      <Space medium />
    </div>
  );
}

export default TasksConfig;
