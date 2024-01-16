import React from 'react';
import Text from '../text/Text';
import { useTranslation } from 'react-i18next';

function TextedLogo() {
  const { t } = useTranslation();

  return (
    <Text isTitle className='texted-logo'>
      <span className='primary'>maraton</span>.com
    </Text>
  );
}

export default TextedLogo;
