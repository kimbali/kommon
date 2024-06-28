import React from 'react';
import Text from '../text/Text';
import TELEGRAM from '../../styles/img/telegram.png';
import INSTAGRAM from '../../styles/img/instagram.png';
import { useMarathon } from '../../context/marathonContext';

function RRSS() {
  const { marathon } = useMarathon();

  return (
    <div className='rrss'>
      {marathon?.telegramLink && (
        <a target='is_blank' href={marathon?.telegramLink}>
          <Text>
            <img src={TELEGRAM} alt='telegram' /> Telegram
          </Text>
        </a>
      )}

      <a href='https://www.instagram.com/bodymaraton'>
        <Text>
          <img src={INSTAGRAM} alt='telegram' /> Instagram
        </Text>
      </a>
    </div>
  );
}

export default RRSS;
