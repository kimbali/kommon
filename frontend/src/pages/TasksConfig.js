import React, { useState } from 'react';
import Button from '../components/button/Button';
import {
  faEdit,
  faMagnifyingGlass,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import Space from '../components/space/Space';
import Input from '../components/input/Input';
import {
  useDeleteTaskMutation,
  useGetTasksQuery,
} from '../slices/tasksApiSlice';
import LoadingError from '../components/loadingError/LoadingError';
import Modal from '../components/modal/Modal';
import TaskForm from '../components/tasks/TaskForm';
import { useTranslation } from 'react-i18next';
import ConfirmModal from '../components/modal/ConfirmModal';

function TasksConfig() {
  const { t } = useTranslation();
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

  const [deleteTask] = useDeleteTaskMutation();

  const onSuccessTask = async () => {
    setShowFormModal(false);
    setCurrentTask(null);
    await refetch();
  };

  const handleEdit = task => {
    setShowFormModal(true);
    setCurrentTask(task);
  };

  const handleDelete = async () => {
    await deleteTask(showDeleteModal.id);
    setShowDeleteModal(false);
    await refetch();
  };

  if (isLoading || isError) {
    return <LoadingError isLoading={isLoading} isError={isError} />;
  }

  return (
    <div>
      <div className='content-left-and-right'>
        <Button isPrimary onClick={() => setShowFormModal(true)}>
          {t('addTask')}
        </Button>

        <form onSubmit={handleSearchSubmit} className='search-input'>
          <Input
            onChange={({ value }) => setSearchValue(value)}
            placeholder={t('searchTitle')}
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
                  className='background-2'
                  onlyIcon
                  iconLeft={faEdit}
                  onClick={() => handleEdit(task)}
                />
              </td>

              <td className='only-icon'>
                <Button
                  className='background-2'
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
        <Modal onClose={setShowFormModal} isSecondary>
          <TaskForm onSuccess={onSuccessTask} data={currentTask} />
        </Modal>
      )}

      {showDeleteModal && (
        <ConfirmModal
          onConfirm={handleDelete}
          onClose={setShowDeleteModal}
          title={t('deleteTask')}
          text={`${t('confirmDelete')} ${showDeleteModal.title}?`}
          confirmLabel={t('delete')}
        />
      )}

      <Space medium />
    </div>
  );
}

export default TasksConfig;
