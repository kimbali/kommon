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

  const [formData, setFormData] = useState([...config?.landingConfig]);
  const [showHelper, setShowHelper] = useState(false);

  const [updateConfigApi] = useUpdateConfigMutation();

  const handleArrayChange = ({ name: completeName, language, value }) => {
    setShowHelper(true);

    const [parent, position, name] = completeName.split('.');

    let allLanguages = JSON.parse(JSON.stringify(formData)); // Deep copy
    const index = allLanguages.findIndex(ele => ele.lang === language);

    if (!language) {
      const updatedArr = allLanguages.map(ele => {
        let completeParent = ele[parent];
        let son = completeParent[+position] || {};
        son[name] = value;
        completeParent[+position] = son;
        return { ...ele, [parent]: completeParent };
      });
      setFormData([...updatedArr]);
      return;
    }

    if (index === -1) {
      toast.error('Rellena primero otros campos con traducciones');
      return;
    }

    let completeParent = allLanguages[index][parent][+position] || {};
    completeParent[name] = value;
    allLanguages[index][parent][+position] = completeParent;

    setFormData([...allLanguages]);
  };

  const handleOnChange = ({ value, name, language }) => {
    setShowHelper(true);

    const allLanguages = JSON.parse(JSON.stringify(formData)); // Deep copy

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
    setShowHelper(false);

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

      <Text isSubtitle className='primary'>
        Premio
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

      <Text isSubtitle className='primary'>
        Resultados
      </Text>

      <Space small />

      <Input
        label='Nombre del usuario'
        name='resultName'
        value={formData?.find(ele => ele.lang === 'es')?.resultName}
        onChange={handleOnChange}
      />

      <Space small />

      <Input
        label='Su comentario'
        name='resultDescription'
        value={formData?.find(ele => ele.lang === 'ca')?.resultDescription}
        onChange={handleOnChange}
        type='textarea'
      />

      <Space extraSmall />

      <div className='form-section'>
        <Input
          label={t('imageBefore')}
          name='resultImageBefore'
          onChange={handleOnChange}
          value={formData?.find(ele => ele.lang === 'es')?.resultImageBefore}
          type='file'
        />

        <Input
          label={t('imageAfter')}
          name='resultImageAfter'
          onChange={handleOnChange}
          value={formData?.find(ele => ele.lang === 'ca')?.resultImageAfter}
          type='file'
        />
      </div>

      <Space medium />

      <Text isSubtitle className='primary'>
        Entrenador 1
      </Text>

      <Space small />

      <div className='form-section'>
        <Input
          label='Título del entrenador'
          name='coach.0.name'
          value={formData?.find(ele => ele.lang === 'es')?.coach[0]?.name}
          onChange={handleArrayChange}
          language='es'
        />

        <Input
          label='Título del entrenador'
          name='coach.0.name'
          value={formData?.find(ele => ele.lang === 'ca')?.coach[0]?.name}
          onChange={handleArrayChange}
          language='ca'
        />
      </div>

      <div className='form-section'>
        <Input
          label='Comentario del entrenador'
          name='coach.0.comment'
          value={formData?.find(ele => ele.lang === 'es')?.coach[0]?.comment}
          onChange={handleArrayChange}
          type='textarea'
          language='es'
        />

        <Input
          label='Comentario del entrenador'
          name='coach.0.comment'
          value={formData?.find(ele => ele.lang === 'ca')?.coach[0]?.comment}
          onChange={handleArrayChange}
          type='textarea'
          language='ca'
        />
      </div>

      <div className='form-section'>
        <Input
          label='Link instagram'
          name='coach.0.instagram'
          value={formData?.find(ele => ele.lang === 'ca')?.coach[0]?.instagram}
          onChange={handleArrayChange}
        />

        <Input
          label={t('imageAfter')}
          name='coach.0.image'
          onChange={handleArrayChange}
          value={formData?.find(ele => ele.lang === 'ca')?.coach[0]?.image}
          type='file'
        />
      </div>

      <Space medium />

      <Text isSubtitle className='primary'>
        Entrenador 2
      </Text>

      <Space small />

      <div className='form-section'>
        <Input
          label='Título del entrenador'
          name='coach.1.name'
          value={formData?.find(ele => ele.lang === 'es')?.coach[1]?.name}
          onChange={handleArrayChange}
          language='es'
        />

        <Input
          label='Título del entrenador'
          name='coach.1.name'
          value={formData?.find(ele => ele.lang === 'ca')?.coach[1]?.name}
          onChange={handleArrayChange}
          language='ca'
        />
      </div>

      <div className='form-section'>
        <Input
          label='Comentario del entrenador'
          name='coach.1.comment'
          value={formData?.find(ele => ele.lang === 'es')?.coach[1]?.comment}
          onChange={handleArrayChange}
          type='textarea'
          language='es'
        />

        <Input
          label='Comentario del entrenador'
          name='coach.1.comment'
          value={formData?.find(ele => ele.lang === 'ca')?.coach[1]?.comment}
          onChange={handleArrayChange}
          type='textarea'
          language='ca'
        />
      </div>

      <div className='form-section'>
        <Input
          label='Link instagram'
          name='coach.1.instagram'
          value={formData?.find(ele => ele.lang === 'ca')?.coach[1]?.instagram}
          onChange={handleArrayChange}
        />

        <Input
          label={t('imageAfter')}
          name='coach.1.image'
          onChange={handleArrayChange}
          value={formData?.find(ele => ele.lang === 'ca')?.coach[1]?.image}
          type='file'
        />
      </div>

      <Space medium />
    </form>
  );
}

export default LandingConfig;
