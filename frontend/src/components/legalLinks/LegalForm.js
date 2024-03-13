import React, { useEffect, useState } from 'react';
import Input from '../input/Input';
import {
  useGetLegalsQuery,
  useUpdateLegalMutation,
} from '../../slices/legalsApiSlice';
import toast from 'react-hot-toast';
import Button from '../button/Button';
import Text from '../text/Text';
import Space from '../space/Space';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function LegalForm({ onSuccess, legalKey, label }) {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({ es: {}, ca: {} });

  const { data: legalsData } = useGetLegalsQuery({});
  const [updateLegals] = useUpdateLegalMutation();

  useEffect(() => {
    if (legalsData?.legals) {
      setFormData({
        _id: legalsData?.legals[0]._id,
        es: { [legalKey]: legalsData.legals[0].es[legalKey] },
        ca: { [legalKey]: legalsData.legals[0].ca[legalKey] },
      });
    }
  }, [legalsData]);

  const handleOnChange = ({ name, value, language }) => {
    setFormData({
      ...formData,
      [language]: { ...formData[language], [name]: value },
    });
  };

  const handleOnSubmit = async e => {
    e.preventDefault();

    try {
      await updateLegals(formData);
      toast.success(t('saved'));
      onSuccess();
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <form onSubmit={handleOnSubmit} className='legal-form'>
      <Text center color='black'>
        Para saber como escribir textos en formato Markdown ver documentación:{' '}
        <Link
          to='https://www.markdownguide.org/basic-syntax/'
          target='_blank'
          rel='noopener noreferrer'
        >
          Markdown syntax documentatión
        </Link>
      </Text>

      <Space small />

      <Input
        type='textarea'
        label={label}
        placeholder='Utiliza un guión "-" seguido de un salto de linea para crear listas y ** para crear titulos'
        name={legalKey}
        onChange={handleOnChange}
        value={formData.es?.[legalKey]}
        language='es'
      />

      <Space small />

      <Input
        type='textarea'
        label={label}
        placeholder='Utiliza un guión "-" seguido de un salto de linea para crear listas y ** para crear titulos'
        name={legalKey}
        onChange={handleOnChange}
        value={formData.ca?.[legalKey]}
        language='ca'
      />

      <Space small />

      <div className='content-on-the-right'>
        <Button type='submit' isPrimary>
          {t('save')}
        </Button>
      </div>

      <Space small />
    </form>
  );
}

export default LegalForm;
