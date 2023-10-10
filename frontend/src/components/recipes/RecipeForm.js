import React, { useEffect, useState } from 'react';
import categoriesEnum from '../../config/enums/categoriesEnum';
import toast from 'react-hot-toast';
import Text from '../text/Text';
import Space from '../space/Space';
import Input from '../input/Input';
import Button from '../button/Button';
import Modal from '../modal/Modal';
import { faCartPlus, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useGetIngredientsQuery } from '../../slices/ingredientsApiSlice';
import {
  useCreateRecipeMutation,
  useUpdateRecipeMutation,
} from '../../slices/recipesApiSlice';
import IngredientForm from '../ingredients/IngredientForm';
import RecipeFormDetails from './RecipeFormDetails';

function RecipeForm({ recipe, onCreate, isEdit }) {
  const [showCreateIngredient, setShowCreateIngredient] = useState(false);
  const [ingredientsOptions, setIngredientsOptions] = useState([]);
  const [formData, setFormData] = useState(
    recipe || {
      steps: [''],
      ingredients: [{}],
    }
  );

  const handleOnChange = ({ name, value }) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleOnChangeSteps = ({ name, value }) => {
    let steps = [...formData.steps];
    const stepNum = name.split('step')[1];
    const stepValue = value;

    steps[stepNum] = stepValue;

    setFormData({ ...formData, steps });
  };

  const handleAddStep = () => {
    const steps = formData.steps;
    steps[steps.length] = '';

    setFormData({ ...formData, steps });
  };

  const handleIngredientChange = ({ name: inputName, value }) => {
    const ingredients = [...formData.ingredients];

    const property = inputName.split('-')[0];
    const position = inputName.split('-')[1];

    ingredients[position] = {
      ...ingredients[position],
      [property]: value,
    };

    setFormData({ ...formData, ingredients });
  };

  const handleAddIngredient = () => {
    const ingredients = formData.ingredients;
    ingredients.push({});

    setFormData({ ...formData, ingredients });
  };

  const handleDeleteIngredientFromList = index => {
    let ingredients = formData.ingredients.filter((_, i) => i !== index);

    if (ingredients.length === 0) {
      ingredients[0] = {};
    }

    setFormData({ ...formData, ingredients });
  };

  const { data: ingredientsData, refetch: refetchIngredients } =
    useGetIngredientsQuery({});

  const onCreateIngredient = () => {
    setShowCreateIngredient(false);
    refetchIngredients();
  };

  useEffect(() => {
    const options =
      ingredientsData?.ingredients
        .map(eachIngredient => {
          const alreadySelected = formData.ingredients.find(
            each =>
              each.ingredient === eachIngredient._id ||
              each.ingredient?._id === eachIngredient._id
          );

          if (alreadySelected) {
            return null;
          }
          return {
            label: eachIngredient.name,
            value: eachIngredient,
          };
        })
        .filter(option => !!option) || [];

    setIngredientsOptions(options);
  }, [ingredientsData?.ingredients, formData.ingredients]);

  const [createRecipe] = useCreateRecipeMutation();

  const handleCreateRecipe = async e => {
    e.preventDefault();

    try {
      await createRecipe(formData).unwrap();
      onCreate();
      toast.success('Created');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const [updateRecipe] = useUpdateRecipeMutation();

  const handleEditRecipe = async e => {
    e.preventDefault();

    try {
      await updateRecipe(formData).unwrap();
      onCreate();
      toast.success('Updated');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className='recipe-form-container'>
      <div className='recipe-form cols-1'>
        <Text isTitle>{isEdit ? 'Edit recipe' : 'Create recipe'}</Text>

        <Space small />

        <form>
          <div className='section grid-container'>
            <Input
              className='cols-4'
              label='title'
              name='title'
              placeholder='Berenjenas rellenas'
              onChange={handleOnChange}
              value={formData.title}
            />

            <div className='cols-3'>
              <Input
                label='image'
                name='image'
                onChange={handleOnChange}
                value={formData.image}
                type='file'
              />
            </div>

            <div className='cols-1'>
              <Input
                label='minutes'
                name='minutes'
                placeholder='0'
                onChange={handleOnChange}
                value={formData.minutes}
                type='number'
              />
            </div>

            <Space extraSmall />
          </div>

          <Space medium />

          <div className='section'>
            <Text isSubtitle>Ingredients</Text>

            <Space extraSmall />

            {showCreateIngredient && (
              <Modal isSecondary onClose={setShowCreateIngredient}>
                <IngredientForm onCreate={onCreateIngredient} />
              </Modal>
            )}

            {formData.ingredients.map((eachIngredient, index) => {
              const ingredientOption = eachIngredient.ingredient && {
                label: eachIngredient.ingredient?.name,
                value: eachIngredient,
              };

              return (
                <React.Fragment key={`ingredient-measure-${index}`}>
                  <div className='grid-container'>
                    <Input
                      key={`ingredient-option-${ingredientOption?.value.ingredient._id}`}
                      className='cols-2'
                      name={`ingredient-${index}`}
                      isSingleSelect
                      options={ingredientsOptions}
                      onChange={handleIngredientChange}
                      defaultValue={ingredientOption}
                    />

                    <div className='cols-1 measure'>
                      <Input
                        name={`quantity-${index}`}
                        type='number'
                        placeholder={
                          ingredientOption?.value.ingredient.measure ||
                          'quantity'
                        }
                        onChange={handleIngredientChange}
                        value={eachIngredient.quantity}
                      />
                    </div>

                    <Button
                      onClick={() => handleDeleteIngredientFromList(index)}
                      iconLeft={faTrash}
                      onlyIcon
                      type='button'
                      isPrimary
                      className='cols-1 no-submit'
                      small
                      disabled={!formData.ingredients[index]}
                    />
                  </div>

                  <Space small />
                </React.Fragment>
              );
            })}

            <Space medium />

            <div className='buttons-container'>
              <Button
                onClick={handleAddIngredient}
                iconLeft={faPlus}
                type='button'
                isSecondary
                disabled={
                  !formData.ingredients[formData.ingredients.length - 1]
                    ?.ingredient || ingredientsOptions.length === 0
                }
                className='cols-1 no-submit'
              >
                Add ingredient
              </Button>

              <Button
                isPrimary
                iconLeft={faCartPlus}
                onClick={() => setShowCreateIngredient(true)}
              >
                Create ingredient
              </Button>
            </div>

            <Space small />
          </div>

          <Space medium />

          <div className='section'>
            <Text isSubtitle>Steps</Text>

            <Space extraSmall />

            {formData.steps.map((eachStep, index) => (
              <React.Fragment key={`step-${index}`}>
                <Input
                  name={`step${index}`}
                  type='textarea'
                  placeholder={`step ${index + 1}`}
                  onChange={handleOnChangeSteps}
                  value={eachStep}
                />

                <Space extraSmall />
              </React.Fragment>
            ))}

            <Button
              onClick={handleAddStep}
              iconLeft={faPlus}
              isSecondary
              className='no-submit'
              type='button'
              disabled={formData.steps[formData.steps.length - 1] === ''}
            >
              Add step
            </Button>

            <Space small />
          </div>

          <Space medium />

          <div className='section'>
            <div className='grid-container'>
              <div className='cols-1'>
                <Input
                  label='calories'
                  name='calories'
                  placeholder='0'
                  onChange={handleOnChange}
                  value={formData.calories}
                  type='number'
                />
              </div>

              <div className='cols-1'>
                <Input
                  label='proteins'
                  name='proteins'
                  placeholder='0'
                  onChange={handleOnChange}
                  value={formData.proteins}
                  type='number'
                />
              </div>

              <div className='cols-1'>
                <Input
                  label='fats'
                  name='fats'
                  placeholder='0'
                  onChange={handleOnChange}
                  value={formData.fats}
                  type='number'
                />
              </div>

              <div className='cols-1'>
                <Input
                  label='carbohydrates'
                  name='carbohydrates'
                  placeholder='0'
                  onChange={handleOnChange}
                  value={formData.carbohydrates}
                  type='number'
                />
              </div>
            </div>

            <Space small />
          </div>

          <Space medium />

          <div className='section '>
            <Input
              key={'categories-form'}
              name='categories'
              label='Categories'
              placeholder='Select all possible categories'
              isMultiSelect
              options={categoriesEnum}
              onChange={handleOnChange}
              defaultValue={
                formData.categories
                  ? categoriesEnum.filter(cat =>
                      formData.categories?.includes(cat.value)
                    )
                  : []
              }
            />

            <Space small />
          </div>

          <Space medium />
        </form>
      </div>

      <div className='cols-1'>
        <RecipeFormDetails
          data={formData}
          isEdit={isEdit}
          handleCreateRecipe={handleCreateRecipe}
          handleEditRecipe={handleEditRecipe}
        />
      </div>
    </div>
  );
}

export default RecipeForm;
