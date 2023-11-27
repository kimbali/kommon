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

function IngredientForm({ onSuccess, data, onCancel }) {
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
      console.log(err);
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <form className='ingredient' onSubmit={handleOnSubmit}>
      <Text isTitle>{data ? 'Update ingredient' : 'Create ingredient'}</Text>

      <Space small />

      <Input
        label='Name'
        placeholder='Ingredient name'
        name='name'
        onChange={handleOnChange}
        value={formData?.name}
      />

      <Space small />

      <Input
        label='allergy'
        name='allergy'
        value={formData?.allergy}
        type='select'
        selectOption='Select allergy'
        options={allergiesEnum}
        noValueOption='No allergies'
        onChange={handleOnChange}
      />

      <Space small />

      <Input
        label='supermarket section'
        name='supermarket'
        value={formData?.supermarket}
        type='select'
        selectOption='Select section'
        options={supermarketEnum}
        noValueOption='Otra'
        onChange={handleOnChange}
      />

      <Space small />

      <Input
        label='measure'
        name='measure'
        value={formData?.measure}
        type='select'
        selectOption='Select measure'
        options={measuresEnum}
        onChange={handleOnChange}
      />

      <Space small />
      <Text>Por cada unidad (1) de medida seleccionada:</Text>
      <Space extraSmall />

      <div className='section'>
        <div className='grid-container'>
          <div className='cols-1'>
            <Input
              label='calories'
              name='calories'
              placeholder='0'
              onChange={handleOnChange}
              value={formData?.calories}
              type='number'
            />
          </div>

          <div className='cols-1'>
            <Input
              label='proteins'
              name='proteins'
              placeholder='0'
              onChange={handleOnChange}
              value={formData?.proteins}
              type='number'
            />
          </div>

          <div className='cols-1'>
            <Input
              label='fats'
              name='fats'
              placeholder='0'
              onChange={handleOnChange}
              value={formData?.fats}
              type='number'
            />
          </div>

          <div className='cols-1'>
            <Input
              label='carbohydrates'
              name='carbohydrates'
              placeholder='0'
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
        label='image'
        name='image'
        onChange={handleOnChange}
        value={formData?.image}
        type='file'
      />

      <Space small />

      <Input
        name='benefits'
        label='Benefits'
        type='textarea'
        className='benefits'
        placeholder='Ingredient benefits'
        onChange={handleOnChange}
        value={formData?.benefits}
      />

      <Space small />

      <Space medium />
      <div className='content-on-the-right'>
        <Button onClick={onCancel} isSecondary>
          Cancel
        </Button>

        <Button isPrimary type='submit'>
          {data ? 'Update' : 'Create'} ingredient
        </Button>
      </div>
    </form>
  );
}

export default IngredientForm;
