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

function PrivacyPolicyForm({ onSuccess }) {
  const [formData, setFormData] = useState();

  const { data: legalsData } = useGetLegalsQuery({});
  const [updateLegals] = useUpdateLegalMutation();

  useEffect(() => {
    if (legalsData?.legals) {
      setFormData(legalsData.legals[0]);
    }
  }, [legalsData]);

  const handleOnChange = ({ name, value }) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleOnSubmit = async e => {
    e.preventDefault();

    try {
      await updateLegals(formData);
      toast.success('Guardado');
      onSuccess();
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <form onSubmit={handleOnSubmit} className='legal-form'>
      <Text color='black'>
        Para saber como escribir textos en formato Markdown ver documentación:
        <Link
          to='https://www.markdownguide.org/basic-syntax/'
          target='_blank'
          rel='noopener noreferrer'
        >
          Markdown syntax documentation
        </Link>
      </Text>

      <Input
        type='textarea'
        label='Política de privacidad'
        placeholder={`
        # Título seccion
        ## Subtítulo seccion
        
        1. Elemento lista 
        2. Segundo elemento
        
        [Texto del link](www.url-de-ejemplo.com)
        `}
        name='privacyPolicy'
        onChange={handleOnChange}
        value={formData?.privacyPolicy}
      />

      <Space small />

      <div className='content-on-the-right'>
        <Button type='submit' isPrimary>
          Save
        </Button>
      </div>

      <Space small />
    </form>
  );
}

export default PrivacyPolicyForm;
