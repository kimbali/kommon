import React, { useState } from 'react';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import LoadingError from '../loadingError/LoadingError';
import Modal from '../modal/Modal';
import DietForm from './DietForm';
import Button from '../button/Button';
import Space from '../space/Space';
import ConfirmModal from '../modal/ConfirmModal';
import toast from 'react-hot-toast';
import Text from '../text/Text';
import { useTranslation } from 'react-i18next';
import {
  useDeleteDietMutation,
  useGetDietsQuery,
} from '../../slices/dietsApiSlice';
import { getYesNoLabel } from '../../config/enums/yesNoEnum';

function DietsList() {
  const { t } = useTranslation();
  const [showFormModal, setShowFormModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentDiet, setCurrentDiet] = useState(null);

  const [deleteDiet] = useDeleteDietMutation();
  const { data, isLoading, isError, refetch } = useGetDietsQuery({});

  const onSuccess = async () => {
    setShowFormModal(false);
    setCurrentDiet(null);
    await refetch();
  };

  const handleEdit = diet => {
    setShowFormModal(true);
    setCurrentDiet(diet);
  };

  const handleDelete = async () => {
    try {
      await deleteDiet(showDeleteModal._id);
      toast.success(t('deleted'));

      setShowDeleteModal(false);
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const handleCloseForm = () => {
    setShowFormModal(false);
    setCurrentDiet(null);
  };

  if (isLoading || isError) {
    return <LoadingError isLoading={isLoading} isError={isError} />;
  }

  return (
    <div>
      <div className='content-left-and-right'>
        <Text isSectionTitle>{t('dietsList')}</Text>

        <Button isPrimary onClick={() => setShowFormModal(true)}>
          {t('addDiet')}
        </Button>
      </div>

      <Space medium />

      <table className='config-table'>
        <tbody>
          {data.diets.map((diet, i) => (
            <tr key={`diet-item-${i}`}>
              <td>{diet.name}</td>

              <td>
                {t('active')}: {getYesNoLabel(diet.isActive)}
              </td>

              <td className='only-icon center'>
                <Button
                  className='background-2'
                  onlyIcon
                  iconLeft={faEdit}
                  onClick={() => handleEdit(diet)}
                />

                <Button
                  className='background-2'
                  onlyIcon
                  iconLeft={faTrash}
                  onClick={() => setShowDeleteModal(diet)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showFormModal && (
        <Modal onClose={handleCloseForm} isSecondary>
          <DietForm onSuccess={onSuccess} data={currentDiet} />
        </Modal>
      )}

      {showDeleteModal && (
        <ConfirmModal
          onConfirm={handleDelete}
          onClose={setShowDeleteModal}
          title={t('deleteDiet')}
          text={`${t('confirmDelete')} ${showDeleteModal.name}?`}
        />
      )}
    </div>
  );
}

export default DietsList;
