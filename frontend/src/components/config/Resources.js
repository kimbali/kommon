import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useConfig } from '../../context/configContext';
import { useUpdateConfigMutation } from '../../slices/configApiSlice';
import Text from '../text/Text';
import Button from '../button/Button';
import Input from '../input/Input';
import Space from '../space/Space';

function Resources() {
  const { t } = useTranslation();
  const { config, updateConfig } = useConfig();

  const [formData, setFormData] = useState({ ...config });
  const [showHelper, setShowHelper] = useState(false);

  const [updateConfigApi] = useUpdateConfigMutation();

  const handleOnChange = ({ value, name }) => {
    setFormData({ ...formData, [name]: value });

    setShowHelper(true);
  };

  const handleSubmit = async e => {
    e.preventDefault();

    setShowHelper(false);

    try {
      await updateConfigApi({ ...config, ...formData });
      updateConfig({ ...formData });
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='content-left-and-right'>
        <Text isSectionTitle>{t('resources')}</Text>

        <div className='helper-and-button'>
          {showHelper && (
            <Text color='primary' isBold center>
              Guardar los camibos
            </Text>
          )}

          <Button isPrimary type='submit'>
            {t('save')}
          </Button>
        </div>
      </div>

      <Space medium />

      <Input
        label={t('marathonsPrice')}
        name='price'
        onChange={handleOnChange}
        value={formData?.price}
        type='number'
        placeholder={t('marathonsPrice')}
      />

      <Space medium />

      <Input
        label={t('waterTracker')}
        name='waterTracker'
        onChange={handleOnChange}
        value={formData?.waterTracker}
        type='file'
        placeholder={t('loadAFile')}
      />

      <Space small />

      <Input
        label={t('vacuumVideo')}
        name='vacuumVideo'
        placeholder={t('vimeoLink')}
        onChange={handleOnChange}
        value={formData?.vacuumVideo}
      />
    </form>
  );
}

export default Resources;
