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
import VideoPlayer from '../components/video/VideoPlayer';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useTranslation } from 'react-i18next';

function WorkoutDetails() {
  const { t } = useTranslation();
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

  const { title, description, minutes, video, level } = workoutDetails;

  return (
    <div className='workout-details'>
      <div className='content-left-and-right'>
        <Text isTitle>{title}</Text>

        <Space small />

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
        </div>
      </div>

      {showDeleteModal && (
        <ConfirmModal
          onConfirm={deleteHandler}
          onClose={setShowDeleteModal}
          title='Delete workout'
          text={`Are you sure you whant to delete: ${title}`}
          confirmLabel='Delete'
        />
      )}

      <Space small />

      <div className='content-on-the-left'>
        <Text>
          <span className='primary'>{minutes}</span> min
        </Text>

        <Text className='pill'>{getLevelLabel(level)}</Text>
      </div>

      <Space medium />

      <VideoPlayer url={video} />

      <Space small />

      <Markdown className='description' remarkPlugins={[remarkGfm]}>
        {description}
      </Markdown>

      {showEditModal && (
        <Modal scroll onClose={setShowEditModal} isSecondary>
          <WorkoutForm isEdit data={workoutDetails} onSuccess={editHandler} />
        </Modal>
      )}
    </div>
  );
}

export default WorkoutDetails;
