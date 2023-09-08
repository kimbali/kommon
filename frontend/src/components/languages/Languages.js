import i18n from '../../traducciones/i18n';
import React from 'react';
import { useState } from 'react';
import ReactCountryFlag from 'react-country-flag';

function Languages() {
  const [language, setLanguage] = useState('es');

  function changeLang(lang) {
    i18n.changeLanguage(lang);
    setLanguage(lang);
  }

  return (
    <div className='languages'>
      <button
        className={`${language !== 'es' ? 'inactive' : ''}`}
        onClick={() => changeLang('es')}
      >
        <ReactCountryFlag
          className='emojiFlag'
          countryCode='ES'
          aria-label='Spanish'
          svg
        />
      </button>

      <button
        className={`${language !== 'en' ? 'inactive' : ''}`}
        onClick={() => changeLang('en')}
      >
        <ReactCountryFlag
          className='emojiFlag'
          countryCode='GB'
          aria-label='English'
          svg
        />
      </button>
    </div>
  );
}

export default Languages;
