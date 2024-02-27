import React, { useState } from 'react';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import LoadingError from '../loadingError/LoadingError';
import Modal from '../modal/Modal';
import FaqForm from './FaqForm';
import Button from '../button/Button';
import Space from '../space/Space';
import ConfirmModal from '../modal/ConfirmModal';
import toast from 'react-hot-toast';
import Text from '../text/Text';
import { useTranslation } from 'react-i18next';
import {
  useDeleteFaqMutation,
  useGetFaqsQuery,
} from '../../slices/faqsApiSlice';
import i18n from '../../traducciones/i18n';

function FaqsList() {
  const { t } = useTranslation();
  const lang = i18n.language;

  const [showFormModal, setShowFormModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentFaq, setCurrentFaq] = useState(null);

  const [deleteFaq] = useDeleteFaqMutation();
  const { data, isLoading, isError, refetch } = useGetFaqsQuery({});

  const onSuccess = async () => {
    setShowFormModal(false);
    setCurrentFaq(null);
    await refetch();
  };

  const handleEdit = faq => {
    setShowFormModal(true);
    setCurrentFaq(faq);
  };

  const handleDelete = async () => {
    try {
      await deleteFaq(showDeleteModal._id);
      toast.success(t('deleted'));

      setShowDeleteModal(false);
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const handleCloseForm = () => {
    setShowFormModal(false);
    setCurrentFaq(null);
  };

  if (isLoading || isError) {
    return <LoadingError isLoading={isLoading} isError={isError} />;
  }

  return (
    <div>
      <div className='content-left-and-right'>
        <Text isSectionTitle>{t('faqsList')}</Text>

        <Button isPrimary onClick={() => setShowFormModal(true)}>
          {t('addFaq')}
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
          {data.map((faq, i) => (
            <tr key={`faq-item-${i}`}>
              <td>{faq[lang]?.title}</td>

              <td>{faq.quantity}</td>

              <td className='only-icon center'>
                <Button
                  className='background-2'
                  onlyIcon
                  iconLeft={faEdit}
                  onClick={() => handleEdit(faq)}
                />

                <Button
                  className='background-2'
                  onlyIcon
                  iconLeft={faTrash}
                  onClick={() => setShowDeleteModal(faq)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showFormModal && (
        <Modal onClose={handleCloseForm}>
          <FaqForm onSuccess={onSuccess} data={currentFaq} />
        </Modal>
      )}

      {showDeleteModal && (
        <ConfirmModal
          onConfirm={handleDelete}
          onClose={setShowDeleteModal}
          title={t('deleteFaq')}
          text={`${t('confirmDelete')} ${showDeleteModal?.es?.title}?`}
        />
      )}
    </div>
  );
}

export default FaqsList;
