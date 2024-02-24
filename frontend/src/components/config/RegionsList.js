import React, { useState } from 'react';
import {
  faEdit,
  faMagnifyingGlass,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import LoadingError from '../loadingError/LoadingError';
import Modal from '../modal/Modal';
import RegionForm from './RegionForm';
import {
  useDeleteRegionMutation,
  useGetRegionsQuery,
} from '../../slices/regionsApiSlice';
import Input from '../input/Input';
import Button from '../button/Button';
import Space from '../space/Space';
import ConfirmModal from '../modal/ConfirmModal';
import toast from 'react-hot-toast';
import Text from '../text/Text';
import { useTranslation } from 'react-i18next';

function RegionsConfig() {
  const { t } = useTranslation();
  const [searchValue, setSearchValue] = useState('');
  const [keywordValue, setKeywordValue] = useState('');
  const [showFormModal, setShowFormModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentRegion, setCurrentRegion] = useState(null);

  const handleSearchSubmit = e => {
    e.preventDefault();

    setKeywordValue(searchValue);
  };

  const [deleteRegion] = useDeleteRegionMutation();
  const { data, isLoading, isError, refetch } = useGetRegionsQuery({
    keyword: keywordValue,
  });

  const onSuccessRegion = async () => {
    setShowFormModal(false);
    setCurrentRegion(null);
    await refetch();
  };

  const handleEdit = region => {
    setShowFormModal(true);
    setCurrentRegion(region);
  };

  const handleDelete = async () => {
    try {
      await deleteRegion(showDeleteModal._id);
      toast.success(t('deleted'));

      setShowDeleteModal(false);
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const handleCloseForm = () => {
    setShowFormModal(false);
    setCurrentRegion(null);
  };

  if (isLoading || isError) {
    return <LoadingError isLoading={isLoading} isError={isError} />;
  }

  return (
    <div>
      <div className='content-left-and-right'>
        <Text isSectionTitle>{t('sendCostConfig')}</Text>

        <div className='content-on-the-right'>
          <Button isPrimary onClick={() => setShowFormModal(true)}>
            {t('addRegion')}
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
      </div>

      <Space medium />

      <table className='config-table'>
        <tbody>
          {data.regions.map((region, i) => (
            <tr key={`region-item-${i}`}>
              <td>{region.region}</td>
              <td className='currency'>
                {region.price}
                {t('currency')}
              </td>

              <td className='only-icon'>
                <Button
                  className='background-2'
                  onlyIcon
                  iconLeft={faEdit}
                  onClick={() => handleEdit(region)}
                />

                <Button
                  className='background-2'
                  onlyIcon
                  iconLeft={faTrash}
                  onClick={() => setShowDeleteModal(region)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showFormModal && (
        <Modal onClose={handleCloseForm} isSecondary>
          <RegionForm onSuccess={onSuccessRegion} data={currentRegion} />
        </Modal>
      )}

      {showDeleteModal && (
        <ConfirmModal
          onConfirm={handleDelete}
          onClose={setShowDeleteModal}
          title={t('deleteRegion')}
          text={`${t('confirmDelete')} ${showDeleteModal.region}?`}
        />
      )}
    </div>
  );
}

export default RegionsConfig;
