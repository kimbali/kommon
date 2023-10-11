import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

function PlayButton() {
  return (
    <div className='play-button'>
      <FontAwesomeIcon icon={faPlay} />
    </div>
  );
}

export default PlayButton;
