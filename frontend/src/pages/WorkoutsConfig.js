import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetWorkoutsQuery } from '../slices/workoutsApiSlice';
import Button from '../components/button/Button';
import Input from '../components/input/Input';
import { faMagnifyingGlass, faPlus } from '@fortawesome/free-solid-svg-icons';
import Space from '../components/space/Space';
import Modal from '../components/modal/Modal';
import WorkoutForm from '../components/workouts/WorkoutForm';
import frontRoutes from '../config/frontRoutes';
import LoadingError from '../components/loadingError/LoadingError';
import WorkoutCard from '../components/workouts/WorkoutCard';
import { useTranslation } from 'react-i18next';

function Workouts() {
  const { t } = useTranslation();
  const [searchValue, setSearchValue] = useState('');
  const [keywordValue, setKeywordValue] = useState('');
  const [showFormModal, setShowFormModal] = useState(false);
  const navigate = useNavigate();

  const {
    data,
    isLoading,
    isError,
    refetch: refetchWorkouts,
  } = useGetWorkoutsQuery({
    keyword: keywordValue,
  });

  useEffect(() => {
    refetchWorkouts();
  }, []);

  const handleSearchValueChange = ({ value }) => {
    setSearchValue(value);
  };

  const handleSearchSubmit = e => {
    e.preventDefault();

    setKeywordValue(searchValue);
  };

  const handleShowModal = () => {
    setShowFormModal(true);
  };

  const handleCardClick = id => {
    navigate(frontRoutes.workoutDetails.replace(':id', id));
  };

  const handleOnCreate = () => {
    setShowFormModal(false);
    refetchWorkouts();
  };

  if (isLoading || isError) {
    return <LoadingError isLoading={isLoading} isError={isError} />;
  }

  return (
    <div>
      <div className='content-left-and-right'>
        <Button onClick={handleShowModal} iconLeft={faPlus} isPrimary>
          create new workout
        </Button>

        <form onSubmit={handleSearchSubmit} className='search-input'>
          <Input
            onChange={handleSearchValueChange}
            placeholder='Search by title'
            iconLeft={faMagnifyingGlass}
            isSecondary
            name='search'
            value={searchValue}
            type='search'
          />
          <Button type='submit' isPrimary iconLeft={faMagnifyingGlass} />
        </form>
      </div>

      <Space medium />

      <ul className='card-list workouts'>
        {data.workouts?.map((eachWorkout, index) => (
          <li className='card-item' key={`workout-${index}`}>
            <WorkoutCard
              data={eachWorkout}
              onClick={() => handleCardClick(eachWorkout._id)}
            />
          </li>
        ))}
      </ul>

      {showFormModal && (
        <Modal scroll onClose={setShowFormModal} isSecondary>
          <WorkoutForm onCreate={handleOnCreate} onSuccess={handleOnCreate} />
        </Modal>
      )}
    </div>
  );
}

export default Workouts;
