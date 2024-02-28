import React from 'react';
import Text from '../text/Text';
import TELEGRAM from '../../styles/img/telegram.png';
import INSTAGRAM from '../../styles/img/instagram.png';
import { useTranslation } from 'react-i18next';

function RRSS() {
  const { t } = useTranslation();

  return (
    <div className='rrss'>
      <a href=''>
        <Text>
          <img src={TELEGRAM} alt='telegram' /> Telegram
        </Text>
      </a>

      <a
        href='https://www.instagram.com/bodymaraton'
        alt='Instagram bodymaraton'
      >
        <Text>
          <img src={INSTAGRAM} alt='telegram' /> Instagram
        </Text>
      </a>
    </div>
  );
}

export default RRSS;
