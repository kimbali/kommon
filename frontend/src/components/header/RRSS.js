import React from 'react';
import Text from '../text/Text';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faPaperPlane } from '@fortawesome/free-solid-svg-icons';

function RRSS() {
  return (
    <div className='rrss'>
      <Text>
        <FontAwesomeIcon icon={faPaperPlane} /> Telegram
      </Text>

      <Text>
        <FontAwesomeIcon icon={faCamera} /> Instagram
      </Text>
    </div>
  );
}

export default RRSS;
