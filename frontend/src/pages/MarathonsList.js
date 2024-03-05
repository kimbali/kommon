import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../components/button/Button';
import {
  faCalendarDays,
  faPlus,
  faSort,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import {
  useDeleteMarathonMutation,
  useGetMarathonsQuery,
  useUpdateMarathonMutation,
} from '../slices/marathonApiSlice';
import { formatDate } from '../utils/formatDate';
import ConfirmModal from '../components/modal/ConfirmModal';
import toast from 'react-hot-toast';
import frontRoutes from '../config/frontRoutes';
import { MARATHON_ID } from '../config/constants';
import { useTranslation } from 'react-i18next';
import { useMarathon } from '../context/marathonContext';
import Modal from '../components/modal/Modal';
import MarathonForm from '../components/marathon/MarathonForm';
import Space from '../components/space/Space';
import { useDate } from '../context/dateContext';

function MarathonsList() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { updateMarathon: updateMarathonContext } = useMarathon();
  const { setCurrentDate } = useDate();

  const { data: marathonsData, refetch: refetchMarathons } =
    useGetMarathonsQuery({});
  const [deleteMarathon] = useDeleteMarathonMutation();
  const [sortOrder, setSortOrder] = useState('asc');

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showActivateModal, setShowActivateModal] = useState(false);
  const [showNewMarathonModal, setShowNewMarathonModal] = useState(false);
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

  const handleGoToLiveMarathon = marathon => {
    setCurrentDate(marathon.startDate);
    navigate(`${frontRoutes.main}?${MARATHON_ID}=${marathon._id}`, {
      replace: true,
    });
  };

  const handleNewMarathon = () => {
    setShowNewMarathonModal(true);
    updateMarathonContext(null);
  };

  const handleOnConfirmMarathon = marathon => {
    setShowNewMarathonModal(false);
    refetchMarathons();
  };

  return (
    <div className='data-table'>
      <Button iconLeft={faPlus} isPrimary onClick={handleNewMarathon}>
        {t('newMarathon')}
      </Button>

      <Space medium />

      <div className='scroll-table'>
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
              <th style={{ padding: '12px' }}>{t('endDate')}</th>
              <th>{t('config')}</th>
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
                      iconLeft={faCalendarDays}
                    />
                  </td>
                  <td>
                    <Button
                      onClick={() => handleGoToLiveMarathon(eachMarathon)}
                      isSecondary
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
      </div>

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

      {showNewMarathonModal && (
        <Modal onClose={setShowNewMarathonModal} isSecondary>
          <MarathonForm
            onSucces={handleOnConfirmMarathon}
            onCancel={() => setShowNewMarathonModal(false)}
          />
        </Modal>
      )}
    </div>
  );
}

export default MarathonsList;
