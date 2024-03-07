import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Input from '../input/Input';
import Space from '../space/Space';
import Button from '../button/Button';
import Text from '../text/Text';
import { useTranslation } from 'react-i18next';
import {
  useCreateGiftMutation,
  useUpdateGiftMutation,
} from '../../slices/giftsApiSlice';

function GiftForm({ data, onSuccess }) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({});

  const [createGift] = useCreateGiftMutation();
  const [updateGift] = useUpdateGiftMutation();

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
        await updateGift({ ...formData }).unwrap();
        toast.success(t('updated'));
      } else {
        await createGift({ ...formData }).unwrap();
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
      <Text isTitle>{data ? t('modifyGift') : t('newGift')}</Text>

      <Space medium />

      <form onSubmit={handleOnSubmit}>
        <div className='form-section'>
          <Input
            label={t('giftName')}
            name='name'
            value={formData?.es?.name}
            placeholder={t('gift')}
            onChange={handleOnChange}
            language='es'
          />

          <Input
            label={t('giftName')}
            name='name'
            value={formData?.ca?.name}
            placeholder={t('gift')}
            onChange={handleOnChange}
            language='ca'
          />
        </div>

        <div className='form-section'>
          <Input
            label={t('description')}
            name='description'
            value={formData?.es?.description}
            onChange={handleOnChange}
            type='textarea'
            language='es'
          />

          <Input
            label={t('description')}
            name='description'
            value={formData?.ca?.description}
            onChange={handleOnChange}
            type='textarea'
            language='ca'
          />
        </div>

        <Input
          label={t('quantity')}
          name='quantity'
          value={formData?.quantity}
          onChange={handleOnChange}
          type='number'
        />

        <Space medium />

        <Input
          label={t('image')}
          name='image'
          onChange={handleOnChange}
          value={formData?.image}
          type='file'
        />

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

export default GiftForm;
