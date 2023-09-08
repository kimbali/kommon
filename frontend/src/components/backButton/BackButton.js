import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Text from '../text/Text';

export const BackButton = () => {
  let navigate = useNavigate();

  return (
    <div className='back-button'>
      <button onClick={() => navigate(-1)}>
        <FontAwesomeIcon icon={faChevronLeft} />

        <Text isCTA>Volver</Text>
      </button>
    </div>
  );
};
