import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../components/button/Button';
import { faEdit, faSort, faTrash } from '@fortawesome/free-solid-svg-icons';
import {
  useDeleteMarathonMutation,
  useGetMarathonsQuery,
  useUpdateMarathonMutation,
} from '../slices/marathonApiSlice';
import { formatDate, formatDateHyphens } from '../utils/formatDate';
import ConfirmModal from '../components/modal/ConfirmModal';
import toast from 'react-hot-toast';
import frontRoutes from '../config/frontRoutes';
import { MARATHON_ID } from '../config/constants';
import { useTranslation } from 'react-i18next';

function MarathonsList() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { data: marathonsData, refetch: refetchMarathons } =
    useGetMarathonsQuery({});
  const [deleteMarathon] = useDeleteMarathonMutation();
  const [sortOrder, setSortOrder] = useState('asc');

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showActivateModal, setShowActivateModal] = useState(false);
  const [marathons, setMarathons] = useState(marathonsData?.marathons);
  const [updateMarathon] = useUpdateMarathonMutation();

  useEffect(() => {
    setMarathons(marathonsData?.marathons);
  }, [marathonsData]);

  const handleDeleteMarathon = async () => {
    try {
      await deleteMarathon(showDeleteModal._id);
      setShowDeleteModal(false);
      toast.success(t('marathonDeleted'));

      await refetchMarathons();
    } catch (err) {
      toast.error(t('error'));
    }
  };

  const handleEditButton = eachMarathon => {
    navigate(`${frontRoutes.planning}?${MARATHON_ID}=${eachMarathon._id}`);
  };

  const sortByStartDate = () => {
    const marathonsSorted = [...marathons];

    marathonsSorted.sort((a, b) => {
      const dateA = new Date(a.startDate);
      const dateB = new Date(b.startDate);

      if (sortOrder === 'asc') {
        return dateA - dateB;
      } else {
        return dateB - dateA;
      }
    });

    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    setMarathons(marathonsSorted);
  };

  const handleActivate = async () => {
    try {
      const res = await updateMarathon({
        ...showActivateModal,
        isActive: true,
      }).unwrap();

      if (res) {
        toast.success(t('activated'));
        await refetchMarathons();
      } else {
        toast.error(t('error'));
      }
    } catch (err) {
      toast.error(t('error'));
    }

    setShowActivateModal(false);
  };

  const handleGoToLiveMarathon = marahton => {
    navigate(`${frontRoutes.main}?${MARATHON_ID}=${marahton._id}`, {
      replace: true,
    });
  };

  return (
    <div className='data-table'>
      <table border='1'>
        <thead>
          <tr>
            <th>{t('marathon')}</th>
            <th>{t('plan')}</th>
            <th>
              <button onClick={sortByStartDate}>
                {t('startDate')} <FontAwesomeIcon icon={faSort} />
              </button>
            </th>
            <th>{t('endDate')}</th>
            <th>{t('edit')}</th>
            <th>{t('see')}</th>
            <th>{t('active')}</th>
            <th>{t('trash')}</th>
          </tr>
        </thead>

        <tbody>
          {marathons?.length > 0 &&
            marathons.map((eachMarathon, i) => (
              <tr key={`marathon-${i}`}>
                <td>{eachMarathon.name}</td>
                <td>{eachMarathon.planning.name}</td>
                <td>{formatDate(eachMarathon.startDate)}</td>
                <td>{formatDate(eachMarathon.endDate)}</td>
                <td>
                  <Button
                    onClick={() => handleEditButton(eachMarathon)}
                    onlyIcon
                    iconLeft={faEdit}
                  >
                    {t('edit')}
                  </Button>
                </td>
                <td>
                  <Button
                    onClick={() => handleGoToLiveMarathon(eachMarathon)}
                    isSecondary
                    disabled={!eachMarathon.isActive}
                  >
                    {t('goToLive')}
                  </Button>
                </td>
                <td>
                  <Button
                    onClick={() => setShowActivateModal(eachMarathon)}
                    isPrimary
                    disabled={eachMarathon.isActive}
                  >
                    {eachMarathon.isActive ? t('active') : t('publish')}
                  </Button>
                </td>
                <td>
                  <Button
                    onClick={() => setShowDeleteModal(eachMarathon)}
                    onlyIcon
                    iconLeft={faTrash}
                  >
                    {t('delete')}
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {showDeleteModal && (
        <ConfirmModal
          onConfirm={handleDeleteMarathon}
          onClose={setShowDeleteModal}
          title={t('deleteMarathon')}
          text={`${t('confirmDelete')} ${showDeleteModal.name}`}
        />
      )}

      {showActivateModal && (
        <ConfirmModal
          onConfirm={handleActivate}
          onClose={setShowActivateModal}
          title='Publicar marathon'
          text={`${t('publishAsk')} ${showActivateModal.name}`}
          description={t('publishHint')}
        />
      )}
    </div>
  );
}

export default MarathonsList;
