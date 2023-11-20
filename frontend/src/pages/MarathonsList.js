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

function MarathonsList() {
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
      toast.success('Marathon deleted');

      await refetchMarathons();
    } catch (err) {
      toast.error('Error');
    }
  };

  const handleEditButton = eachMarathon => {
    navigate(
      `${frontRoutes.planning}/${eachMarathon._id}/${formatDateHyphens(
        eachMarathon.startDate
      )}`
    );
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
        toast.success('Marathon activated');
        await refetchMarathons();
      } else {
        toast.error('Error');
      }
    } catch (err) {
      toast.error('Error');
    }

    setShowActivateModal(false);
  };

  const handleGoToLiveMarathon = marahton => {
    navigate(`${frontRoutes.main}/${marahton._id}`, {
      replace: true,
    });
  };

  return (
    <div className='marathons-list'>
      <table border='1'>
        <thead>
          <tr>
            <th>Marathon</th>
            <th>Plan</th>
            <th>
              <button onClick={sortByStartDate}>
                Start date <FontAwesomeIcon icon={faSort} />
              </button>
            </th>
            <th>End date</th>
            <th>Trash</th>
            <th>Edit</th>
            <th>Activate</th>
            <th>Go to live</th>
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
                    onClick={() => setShowDeleteModal(eachMarathon)}
                    onlyIcon
                    iconLeft={faTrash}
                  >
                    Delete
                  </Button>
                </td>
                <td>
                  <Button
                    onClick={() => handleEditButton(eachMarathon)}
                    onlyIcon
                    iconLeft={faEdit}
                  >
                    Edit
                  </Button>
                </td>
                <td>
                  <Button
                    onClick={() => setShowActivateModal(eachMarathon)}
                    isPrimary
                    disabled={eachMarathon.isActive}
                  >
                    {eachMarathon.isActive ? 'Active' : 'Activate'}
                  </Button>
                </td>
                <td>
                  <Button
                    onClick={() => handleGoToLiveMarathon(eachMarathon)}
                    isSecondary
                    disabled={!eachMarathon.isActive}
                  >
                    Go to live
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
          title='Delete marathon'
          text={`Are you sure you whant to delete: ${showDeleteModal.name}`}
        />
      )}

      {showActivateModal && (
        <ConfirmModal
          onConfirm={handleActivate}
          onClose={setShowActivateModal}
          title='Activate marathon'
          text={`Are you sure you whant to activate: ${showActivateModal.name}`}
        />
      )}
    </div>
  );
}

export default MarathonsList;
