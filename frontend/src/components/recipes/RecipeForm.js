import React, { useEffect, useState } from 'react';
import mealsEnum from '../../config/enums/mealsEnum';
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
import sortBy from '../../utils/sortBy';
import { useTranslation } from 'react-i18next';

function RecipeForm({ recipe, onCreate, isEdit }) {
  const { t } = useTranslation();
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
    let ingredients = [...formData.ingredients];
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

    const sortedOptions = sortBy(options, 'label');

    setIngredientsOptions(sortedOptions);
  }, [ingredientsData?.ingredients, formData.ingredients]);

  const [createRecipe] = useCreateRecipeMutation();

  const handleCreateRecipe = async e => {
    e.preventDefault();

    try {
      await createRecipe(formData).unwrap();
      onCreate();
      toast.success(t('created'));
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
      toast.success(t('updated'));
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className='recipe-form-container'>
      <div className='recipe-form cols-1'>
        <Text isTitle>{isEdit ? t('edit') : t('create')}</Text>

        <Space small />

        <form>
          <div className='section grid-container'>
            <div className='cols-4'>
              <Input
                label={t('title')}
                name='title'
                placeholder={t('recipeTitle')}
                onChange={handleOnChange}
                value={formData.title}
              />
            </div>

            <div className='cols-3'>
              <Input
                label={t('image')}
                name='image'
                onChange={handleOnChange}
                value={formData.image}
                type='file'
              />
            </div>

            <div className='cols-1'>
              <Input
                label={t('minutes')}
                name='minutes'
                placeholder={t('placeholderNumber')}
                onChange={handleOnChange}
                value={formData.minutes}
                type='number'
              />
            </div>

            <Space extraSmall />
          </div>

          <Space medium />

          <div className='section'>
            <Text isSubtitle>{t('ingredients')}</Text>

            <Space extraSmall />

            {showCreateIngredient && (
              <Modal scroll isSecondary onClose={setShowCreateIngredient}>
                <IngredientForm
                  onSuccess={onCreateIngredient}
                  onCancel={() => setShowCreateIngredient(false)}
                />
              </Modal>
            )}

            {formData.ingredients.map((eachIngredient, index) => {
              const ingredientOption = eachIngredient.ingredient && {
                label: eachIngredient.ingredient?.name,
                value: eachIngredient,
              };

              return (
                <React.Fragment key={`ingredient-measure-${index}`}>
                  <div className='grid-container ingredients'>
                    <Input
                      key={`ingredient-option-${ingredientOption?.value.ingredient._id}`}
                      className='cols-1'
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
                          t('quantity')
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
                {t('addIngredient')}
              </Button>

              <Button
                isPrimary
                iconLeft={faCartPlus}
                onClick={() => setShowCreateIngredient(true)}
              >
                {t('createIngredient')}
              </Button>
            </div>

            {ingredientsOptions.length === 0 && (
              <Text>{t('noMoreIngredients')}</Text>
            )}
            <Space small />
          </div>

          <Space medium />

          <div className='section'>
            <Text isSubtitle>{t('steps')}</Text>

            <Space extraSmall />

            {formData.steps.map((eachStep, index) => (
              <React.Fragment key={`step-${index}`}>
                <Input
                  name={`step${index}`}
                  type='textarea'
                  placeholder={`${t('step')} ${index + 1}`}
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
              {t('addStep')}
            </Button>

            <Space small />
          </div>

          <Space medium />

          <div className='section '>
            <Input
              key='meals-form'
              label={t('meals')}
              name='meals'
              placeholder={t('allMeals')}
              isMultiSelect
              options={mealsEnum}
              onChange={handleOnChange}
              defaultValue={
                formData.meals
                  ? mealsEnum.filter(cat => formData.meals?.includes(cat.value))
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
