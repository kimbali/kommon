import i18n from '../../traducciones/i18n';
import React from 'react';
import { useState } from 'react';
import ReactCountryFlag from 'react-country-flag';
import CAT_FLAG from '../../styles/assets/cat-flag.png';

function Languages() {
  const [language, setLanguage] = useState('es');

  function changeLang(lang) {
    i18n.changeLanguage(lang);
    setLanguage(lang);
  }

  return (
    <div className='languages'>
      <button
        className={`language ${language !== 'es' ? 'inactive' : ''}`}
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
        className={`language ${language !== 'ca' ? 'inactive' : ''}`}
        onClick={() => changeLang('ca')}
      >
        <img className='emojiFlag' src={CAT_FLAG} alt='Bandera catalunya' />
      </button>
    </div>
  );
}

export default Languages;
