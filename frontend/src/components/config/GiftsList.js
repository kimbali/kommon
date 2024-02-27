import React, { useState } from 'react';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import LoadingError from '../loadingError/LoadingError';
import Modal from '../modal/Modal';
import GiftForm from './GiftForm';
import Button from '../button/Button';
import Space from '../space/Space';
import ConfirmModal from '../modal/ConfirmModal';
import toast from 'react-hot-toast';
import Text from '../text/Text';
import { useTranslation } from 'react-i18next';
import {
  useDeleteGiftMutation,
  useGetGiftsQuery,
} from '../../slices/giftsApiSlice';
import i18n from '../../traducciones/i18n';

function GiftsList() {
  const { t } = useTranslation();
  const lang = i18n.language;

  const [showFormModal, setShowFormModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentGift, setCurrentGift] = useState(null);

  const [deleteGift] = useDeleteGiftMutation();
  const { data, isLoading, isError, refetch } = useGetGiftsQuery({});

  const onSuccess = async () => {
    setShowFormModal(false);
    setCurrentGift(null);
    await refetch();
  };

  const handleEdit = gift => {
    setShowFormModal(true);
    setCurrentGift(gift);
  };

  const handleDelete = async () => {
    try {
      await deleteGift(showDeleteModal._id);
      toast.success(t('deleted'));

      setShowDeleteModal(false);
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const handleCloseForm = () => {
    setShowFormModal(false);
    setCurrentGift(null);
  };

  if (isLoading || isError) {
    return <LoadingError isLoading={isLoading} isError={isError} />;
  }

  return (
    <div>
      <div className='content-left-and-right'>
        <Text isSectionTitle>{t('giftsList')}</Text>

        <Button isPrimary onClick={() => setShowFormModal(true)}>
          {t('addGift')}
        </Button>
      </div>

      {data?.length === 0 && (
        <>
          <Space medium />
          <Text color='primary'>No hay regalos configurados</Text>
        </>
      )}

      <Space medium />

      <table className='config-table'>
        <tbody>
          {data.map((gift, i) => (
            <tr key={`gift-item-${i}`}>
              <td>{gift[lang]?.name}</td>

              <td>{gift.quantity}</td>

              <td className='only-icon center'>
                <Button
                  className='background-2'
                  onlyIcon
                  iconLeft={faEdit}
                  onClick={() => handleEdit(gift)}
                />

                <Button
                  className='background-2'
                  onlyIcon
                  iconLeft={faTrash}
                  onClick={() => setShowDeleteModal(gift)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showFormModal && (
        <Modal onClose={handleCloseForm} isSecondary>
          <GiftForm onSuccess={onSuccess} data={currentGift} />
        </Modal>
      )}

      {showDeleteModal && (
        <ConfirmModal
          onConfirm={handleDelete}
          onClose={setShowDeleteModal}
          title={t('deleteGift')}
          text={`${t('confirmDelete')} ${showDeleteModal.name}?`}
        />
      )}
    </div>
  );
}

export default GiftsList;
