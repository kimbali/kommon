import React, { useState } from 'react';
import Input from '../input/Input';
import Space from '../space/Space';
import measuresEnum from '../../config/enums/measuresEnum';
import allergiesEnum from '../../config/enums/allergiesEnum';
import toast from 'react-hot-toast';
import { useCreateIngredientMutation } from '../../slices/ingredientsApiSlices';
import Button from '../button/Button';
import { faAdd } from '@fortawesome/free-solid-svg-icons';

function IngredientForm({ onCreate }) {
  const [formData, setFormData] = useState({
    name: '',
    calories: '',
    proteins: '',
    fats: '',
    carbohydrates: '',
    image: '',
    allergy: '',
    measure: '',
    benefits: '',
  });

  const [createIngredient] = useCreateIngredientMutation();

  const handleOnChange = ({ name, value }) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleOnSubmit = async e => {
    e.preventDefault();

    try {
      await createIngredient(formData);
      onCreate();
      toast.success(`${formData.name} created!`);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <form className='ingredient' onSubmit={handleOnSubmit}>
      <Input
        label='Name'
        placeholder='Ingredient name'
        name='name'
        onChange={handleOnChange}
        value={formData.name}
      />

      <Space small />

      <div className='grid-container'>
        <Input
          label='measure'
          name='measure'
          value={formData.measure}
          type='select'
          selectOption='Select measure'
          options={measuresEnum}
          className='cols-2'
          onChange={handleOnChange}
        />

        <Input
          label='allergy'
          name='allergy'
          value={formData.allergy}
          type='select'
          selectOption='Select allergy'
          options={allergiesEnum}
          noValueOption='No allergies'
          className='cols-2'
          onChange={handleOnChange}
        />
      </div>

      <Space small />

      <Space small />

      <Input
        name='benefits'
        label='Benefits'
        type='textarea'
        className='benefits'
        placeholder='Ingredient benefits'
        onChange={handleOnChange}
        value={formData.benefits}
      />

      <Space small />

      <Input
        label='image'
        name='image'
        onChange={handleOnChange}
        value={formData.image}
        type='file'
      />

      <Space medium />

      <div className='content-on-the-right'>
        <Button isPrimary iconLeft={faAdd} type='submit'>
          Create ingredient
        </Button>
      </div>
    </form>
  );
}

export default IngredientForm;
