import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import LoadingError from '../components/loadingError/LoadingError';
import Text from '../components/text/Text';
import Space from '../components/space/Space';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import Button from '../components/button/Button';
import frontRoutes from '../config/frontRoutes';
import ConfirmModal from '../components/modal/ConfirmModal';
import Modal from '../components/modal/Modal';
import VideoPlayer from '../components/video/VideoPlayer';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import MeditationForm from '../components/meditation/MeditationForm';
import {
  useDeleteMeditationMutation,
  useGetMeditationDetailsQuery,
} from '../slices/meditationsApiSlice';
import { useGetImageUrlQuery } from '../slices/imagesApiSlice';
import { useTranslation } from 'react-i18next';

function MeditationDetails() {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const {
    data: meditationDetails,
    isLoading,
    isError,
    refetch,
  } = useGetMeditationDetailsQuery(id);

  const { data: imageS3 } = useGetImageUrlQuery(
    {
      url: meditationDetails?.image?.url,
    },
    { skip: !meditationDetails?.image?.url }
  );

  const [deleteMeditation] = useDeleteMeditationMutation();

  const deleteHandler = async () => {
    try {
      await deleteMeditation(id);
      toast.success(t('deleted'));
      navigate(frontRoutes.meditationsConfig);
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

  if (!meditationDetails) {
    return <Text>Meditation not found</Text>;
  }

  const { title, description, minutes, audio } = meditationDetails;

  return (
    <div className='workout-details meditation'>
      <div className='content-left-and-right'>
        <Text isTitle>{title}</Text>

        <div className='content-on-the-right'>
          <Button
            onClick={() => setShowEditModal(true)}
            iconLeft={faEdit}
            isPrimary
          >
            Edit meditation
          </Button>

          <Button
            onClick={() => setShowDeleteModal(true)}
            iconLeft={faTrash}
            isSecondary
          >
            Delete meditation
          </Button>
        </div>
      </div>

      <Space medium />

      <div
        className='workout-card'
        style={{ backgroundImage: `url(${imageS3?.signedUrl})` }}
      />

      <Space small />

      <div className='content-on-the-left'>
        <Text>
          <span className='primary'>{minutes}</span> min
        </Text>
      </div>

      <Space small />

      <Markdown className='description' remarkPlugins={[remarkGfm]}>
        {description}
      </Markdown>

      <VideoPlayer url={audio} height='30px' />

      {showEditModal && (
        <Modal scroll onClose={setShowEditModal} isSecondary>
          <MeditationForm
            isEdit
            data={meditationDetails}
            onSuccess={editHandler}
          />
        </Modal>
      )}

      {showDeleteModal && (
        <ConfirmModal
          onConfirm={deleteHandler}
          onClose={setShowDeleteModal}
          title='Delete meditation'
          text={`Are you sure you whant to delete: ${title}`}
          confirmLabel='Delete'
        />
      )}
    </div>
  );
}

export default MeditationDetails;
