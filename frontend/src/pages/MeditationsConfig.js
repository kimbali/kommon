import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/button/Button';
import Input from '../components/input/Input';
import { faMagnifyingGlass, faPlus } from '@fortawesome/free-solid-svg-icons';
import Space from '../components/space/Space';
import Modal from '../components/modal/Modal';
import frontRoutes from '../config/frontRoutes';
import LoadingError from '../components/loadingError/LoadingError';
import { useGetMeditationsQuery } from '../slices/meditationsApiSlice';
import MeditationCard from '../components/meditation/MeditationCard';
import MeditationForm from '../components/meditation/MeditationForm';

function MeditationsConfig() {
  const [searchValue, setSearchValue] = useState('');
  const [keywordValue, setKeywordValue] = useState('');
  const [showFormModal, setShowFormModal] = useState(false);
  const navigate = useNavigate();

  const {
    data,
    isLoading,
    isError,
    refetch: refetchMeditations,
  } = useGetMeditationsQuery({
    keyword: keywordValue,
  });

  useEffect(() => {
    refetchMeditations();
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
    navigate(frontRoutes.meditationDetails.replace(':id', id));
  };

  const handleOnCreate = () => {
    setShowFormModal(false);
    refetchMeditations();
  };

  if (isLoading || isError) {
    return <LoadingError isLoading={isLoading} isError={isError} />;
  }

  return (
    <div>
      <div className='content-left-and-right'>
        <Button onClick={handleShowModal} iconLeft={faPlus} isPrimary>
          create new meditation
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
        {data.meditations?.map((each, index) => (
          <li className='card-item' key={`meditation-${index}`}>
            <MeditationCard
              data={each}
              onClick={() => handleCardClick(each._id)}
            />
          </li>
        ))}
      </ul>

      {showFormModal && (
        <Modal scroll onClose={setShowFormModal} isSecondary>
          <MeditationForm
            onCreate={handleOnCreate}
            onSuccess={handleOnCreate}
          />
        </Modal>
      )}
    </div>
  );
}

export default MeditationsConfig;
