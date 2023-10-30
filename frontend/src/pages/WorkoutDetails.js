import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import {
  useDeleteWorkoutMutation,
  useGetWorkoutDetailsQuery,
} from '../slices/workoutsApiSlice';
import LoadingError from '../components/loadingError/LoadingError';
import Text from '../components/text/Text';
import Space from '../components/space/Space';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import Button from '../components/button/Button';
import frontRoutes from '../config/frontRoutes';
import ConfirmModal from '../components/modal/ConfirmModal';
import Modal from '../components/modal/Modal';

import WorkoutForm from '../components/workouts/WorkoutForm';
import { getLevelLabel } from '../config/enums/levelsEnum';

function WorkoutDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const {
    data: workoutDetails,
    isLoading,
    isError,
    refetch,
  } = useGetWorkoutDetailsQuery(id);

  const [deleteWorkout] = useDeleteWorkoutMutation();

  const deleteHandler = async () => {
    try {
      await deleteWorkout(id);
      toast.success('Workout deleted');
      navigate(frontRoutes.workoutsConfig);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const editHandler = () => {
    setShowEditModal(false);
    refetch();
  };

  if (isLoading || isError) {
    return <LoadingError isLoading={isLoading} isError={isError} />;
  }

  if (!workoutDetails) {
    return <Text>Recipe not found</Text>;
  }

  const { title, description, minutes, image, video, level } = workoutDetails;

  return (
    <>
      <div className='content-on-the-right'>
        <Button
          onClick={() => setShowEditModal(true)}
          iconLeft={faEdit}
          isPrimary
        >
          Edit workout
        </Button>

        <Button
          onClick={() => setShowDeleteModal(true)}
          iconLeft={faTrash}
          isSecondary
        >
          Delete workout
        </Button>

        {showDeleteModal && (
          <ConfirmModal
            onConfirm={deleteHandler}
            onClose={setShowDeleteModal}
            title='Delete workout'
            text={`Are you sure you whant to delete: ${title}`}
            confirmLabel='Delete'
          />
        )}
      </div>

      <Space medium />

      <Text isTitle>{title}</Text>

      <Space small />

      <Text>{description}</Text>

      <Space medium />

      {image && <img alt={title} src={`${image}`} />}

      <Space small />

      <div className='content-left-and-right'>
        <Text>
          <span className='primary'>{minutes}</span> min
        </Text>

        <Text className='pill'>{getLevelLabel(level)}</Text>
      </div>

      {showEditModal && (
        <Modal scroll onClose={setShowEditModal} isSecondary>
          <WorkoutForm isEdit data={workoutDetails} onSuccess={editHandler} />
        </Modal>
      )}
    </>
  );
}

export default WorkoutDetails;
