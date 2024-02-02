import React, { useState } from 'react';
import Input from '../input/Input';
import Space from '../space/Space';
import measuresEnum from '../../config/enums/measuresEnum';
import allergiesEnum from '../../config/enums/allergiesEnum';
import toast from 'react-hot-toast';
import {
  useCreateIngredientMutation,
  useUpdateIngredientMutation,
} from '../../slices/ingredientsApiSlice';
import Button from '../button/Button';
import Text from '../text/Text';
import supermarketEnum from '../../config/enums/supermarketEnum';
import { useTranslation } from 'react-i18next';

function IngredientForm({ onSuccess, data, onCancel }) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState(data || {});

  const [createIngredient] = useCreateIngredientMutation();
  const [updateIngredient] = useUpdateIngredientMutation();

  const handleOnChange = ({ name, value }) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleOnSubmit = async e => {
    e.preventDefault();

    try {
      if (data) {
        await updateIngredient(formData);
      } else {
        await createIngredient(formData);
      }

      onSuccess();
      toast.success(`${formData?.name} ${data ? 'updated' : 'created'}!`);
    } catch (err) {
      console.error(err);
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <form className='ingredient' onSubmit={handleOnSubmit}>
      <Text isTitle>{data ? t('update') : t('create')}</Text>

      <Space small />

      <Input
        label={t('name')}
        placeholder={t('ingredientName')}
        name='name'
        onChange={handleOnChange}
        value={formData?.name}
      />

      <Space small />

      <Input
        label={t('allergy')}
        name='allergy'
        value={formData?.allergy}
        type='select'
        selectOption={t('selectAllergy')}
        options={allergiesEnum}
        noValueOption={t('noAllergies')}
        onChange={handleOnChange}
      />

      <Space small />

      <Input
        label={t('supermarketSection')}
        name='supermarket'
        value={formData?.supermarket}
        type='select'
        selectOption={t('selectSection')}
        options={supermarketEnum}
        noValueOption={t('other')}
        onChange={handleOnChange}
      />

      <Space small />

      <Input
        label={t('measure')}
        name='measure'
        value={formData?.measure}
        type='select'
        selectOption={t('selectMeasure')}
        options={measuresEnum}
        onChange={handleOnChange}
      />

      <Space small />
      <Text>{t('forEachUnityOfSelectedMeasure')}</Text>
      <Space extraSmall />

      <div className='section'>
        <div className='grid-container'>
          <div className='cols-1'>
            <Input
              label={t('calories')}
              name='calories'
              placeholder={t('placeholderNumber')}
              onChange={handleOnChange}
              value={formData?.calories}
              type='number'
            />
          </div>

          <div className='cols-1'>
            <Input
              label={t('proteins')}
              name='proteins'
              placeholder={t('placeholderNumber')}
              onChange={handleOnChange}
              value={formData?.proteins}
              type='number'
            />
          </div>

          <div className='cols-1'>
            <Input
              label={t('fats')}
              name='fats'
              placeholder={t('placeholderNumber')}
              onChange={handleOnChange}
              value={formData?.fats}
              type='number'
            />
          </div>

          <div className='cols-1'>
            <Input
              label={t('carbohydrates')}
              name='carbohydrates'
              placeholder={t('placeholderNumber')}
              onChange={handleOnChange}
              value={formData?.carbohydrates}
              type='number'
            />
          </div>
        </div>

        <Space small />
      </div>

      <Space small />

      <Input
        label={t('image')}
        name='image'
        onChange={handleOnChange}
        value={formData?.image}
        type='file'
      />

      <Space small />

      <Input
        label={t('benefits')}
        name='benefits'
        type='textarea'
        className='benefits'
        placeholder={t('ingredientBenefits')}
        onChange={handleOnChange}
        value={formData?.benefits}
      />

      <Space small />

      <Space medium />
      <div className='content-on-the-right'>
        <Button onClick={onCancel} isSecondary>
          {t('cancel')}
        </Button>

        <Button isPrimary type='submit'>
          {data ? t('update') : t('create')} {t('ingredient')}
        </Button>
      </div>
    </form>
  );
}

export default IngredientForm;
