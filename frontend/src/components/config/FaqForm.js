import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Input from '../input/Input';
import Space from '../space/Space';
import Button from '../button/Button';
import Text from '../text/Text';
import { useTranslation } from 'react-i18next';
import {
  useCreateFaqMutation,
  useUpdateFaqMutation,
} from '../../slices/faqsApiSlice';

function FaqForm({ data, onSuccess }) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({});

  const [createFaq] = useCreateFaqMutation();
  const [updateFaq] = useUpdateFaqMutation();

  const handleOnChange = ({ name, value, language }) => {
    if (language) {
      setFormData({
        ...formData,
        [language]: { ...formData[language], [name]: value },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  useEffect(() => {
    setFormData({ ...data });

    return () => {
      setFormData();
    };
  }, [data]);

  const handleOnSubmit = async e => {
    e.preventDefault();

    try {
      if (data) {
        await updateFaq({ ...formData }).unwrap();
        toast.success(t('updated'));
      } else {
        await createFaq({ ...formData }).unwrap();
        toast.success(t('created'));
      }

      onSuccess();
    } catch (err) {
      console.error(err);
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div>
      <Text isTitle>{data ? t('modifyFaq') : t('newFaq')}</Text>

      <Space medium />

      <form onSubmit={handleOnSubmit}>
        <div className='form-section'>
          <Input
            label={t('faqName')}
            name='title'
            value={formData?.es?.title}
            placeholder={t('faq')}
            onChange={handleOnChange}
            language='es'
          />

          <Input
            label={t('faqName')}
            name='title'
            value={formData?.ca?.title}
            placeholder={t('faq')}
            onChange={handleOnChange}
            language='ca'
          />
        </div>

        <Space medium />

        <div className='form-section'>
          <Input
            label={t('faqAnswer')}
            name='description'
            value={formData?.es?.description}
            onChange={handleOnChange}
            type='textarea'
            language='es'
          />

          <Input
            label={t('faqAnswer')}
            name='description'
            value={formData?.ca?.description}
            onChange={handleOnChange}
            type='textarea'
            language='ca'
          />
        </div>

        <Space medium />

        <div className='content-on-the-right'>
          <Button isPrimary type='submit'>
            {data ? t('update') : t('create')}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default FaqForm;
