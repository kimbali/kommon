import React from 'react';
import Text from '../text/Text';
import TELEGRAM from '../../styles/img/telegram.png';
import INSTAGRAM from '../../styles/img/instagram.png';

function RRSS() {
  return (
    <div className='rrss'>
      <a href=''>
        <Text>
          <img src={TELEGRAM} alt='telegram' /> Telegram
        </Text>
      </a>

      <a href=''>
        <Text>
          <img src={INSTAGRAM} alt='telegram' /> Instagram
        </Text>
      </a>
    </div>
  );
}

export default RRSS;
