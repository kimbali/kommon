import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useConfig } from '../../context/configContext';
import { useUpdateConfigMutation } from '../../slices/configApiSlice';
import Text from '../text/Text';
import Button from '../button/Button';
import Space from '../space/Space';
import Input from '../input/Input';
import toast from 'react-hot-toast';

function LandingConfig() {
  const { t } = useTranslation();
  const { config, updateConfig } = useConfig();

  const [formData, setFormData] = useState();

  const [updateConfigApi] = useUpdateConfigMutation();

  const handleOnChange = ({ value, name, language }) => {
    const allLanguages = JSON.parse(
      JSON.stringify(formData || [...config?.landingConfig])
    ); // Deep copy

    const index = allLanguages.findIndex(ele => ele.lang === language);

    if (!language) {
      const updatedArr = allLanguages.map(ele => {
        return { ...ele, [name]: value };
      });
      setFormData([...updatedArr]);
      return;
    }

    if (index === -1) {
      const newLanguage = { lang: language, [name]: value };
      allLanguages.push(newLanguage);
    } else {
      allLanguages[index][name] = value;
    }

    setFormData([...allLanguages]);
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      await updateConfigApi({ ...config, landingConfig: [...formData] });

      updateConfig({ ...config, landingConfig: [...formData] });

      toast.success(t('saved'));
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='content-left-and-right'>
        <Text isSectionTitle>{t('modifyLanding')}</Text>

        <div className='helper-and-button'>
          <Button isPrimary type='submit'>
            {t('save')}
          </Button>
        </div>
      </div>

      <Space medium />

      <Text isSubtitle className='primary'>
        Regalo
      </Text>

      <Space small />

      <div className='form-section'>
        <Input
          label='Nombre dispositivo'
          name='giftTitle'
          value={formData?.find(ele => ele.lang === 'es')?.giftTitle}
          onChange={handleOnChange}
          language='es'
        />

        <Input
          label='Nombre dispositivo'
          name='giftTitle'
          value={formData?.find(ele => ele.lang === 'ca')?.giftTitle}
          onChange={handleOnChange}
          language='ca'
        />
      </div>

      <div className='form-section'>
        <Input
          label='Descripción'
          name='giftDescription'
          value={formData?.find(ele => ele.lang === 'es')?.giftDescription}
          onChange={handleOnChange}
          language='es'
        />

        <Input
          label='Descripción'
          name='giftDescription'
          value={formData?.find(ele => ele.lang === 'ca')?.giftDescription}
          onChange={handleOnChange}
          language='ca'
        />
      </div>

      <Input
        label={t('image')}
        name='giftImage'
        onChange={handleOnChange}
        value={formData?.iphoneImage}
        type='file'
      />

      <Space medium />
    </form>
  );
}

export default LandingConfig;
