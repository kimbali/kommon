import React, { useEffect, useState } from 'react';
import categoriesEnum from '../../config/enums/categoriesEnum';
import toast from 'react-hot-toast';
import Text from '../text/Text';
import Space from '../space/Space';
import Input from '../input/Input';
import Button from '../button/Button';
import Modal from '../modal/Modal';
import {
  faAdd,
  faCartPlus,
  faEdit,
  faPlus,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { useGetIngredientsQuery } from '../../slices/ingredientsApiSlices';
import {
  useCreateRecipeMutation,
  useUpdateRecipeMutation,
} from '../../slices/recipesApiSlice';
import IngredientForm from '../ingredients/IngredientForm';

function RecipeForm({ recipe, onCreate, isEdit }) {
  const [showCreateIngredient, setShowCreateIngredient] = useState(false);
  const [ingredientsOptions, setIngredientsOptions] = useState([]);
  const [recipeData, setRecipeData] = useState(
    recipe || {
      steps: [''],
      ingredients: [{}],
    }
  );

  const handleOnChange = ({ name, value }) => {
    setRecipeData({ ...recipeData, [name]: value });
  };

  const handleOnChangeSteps = ({ name, value }) => {
    let steps = [...recipeData.steps];
    const stepNum = name.split('step')[1];
    const stepValue = value;

    steps[stepNum] = stepValue;

    setRecipeData({ ...recipeData, steps });
  };

  const handleAddStep = () => {
    const steps = recipeData.steps;
    steps[steps.length] = '';

    setRecipeData({ ...recipeData, steps });
  };

  const handleIngredientChange = ({ name: inputName, value }) => {
    const ingredients = [...recipeData.ingredients];

    const property = inputName.split('-')[0];
    const position = inputName.split('-')[1];

    ingredients[position] = {
      ...ingredients[position],
      [property]: value,
    };

    setRecipeData({ ...recipeData, ingredients });
  };

  const handleAddIngredient = () => {
    const ingredients = recipeData.ingredients;
    ingredients.push({});

    setRecipeData({ ...recipeData, ingredients });
  };

  const handleDeleteIngredientFromList = index => {
    let ingredients = recipeData.ingredients.filter((_, i) => i !== index);

    if (ingredients.length === 0) {
      ingredients[0] = {};
    }

    setRecipeData({ ...recipeData, ingredients });
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
          const alreadySelected = recipeData.ingredients.find(
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
  }, [ingredientsData?.ingredients, recipeData.ingredients]);

  const [createRecipe] = useCreateRecipeMutation();

  const handleCreateRecipe = async e => {
    e.preventDefault();

    try {
      await createRecipe(recipeData).unwrap();
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
      await updateRecipe(recipeData).unwrap();
      onCreate();
      toast.success('Updated');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className='recipe-form'>
      <Text isTitle>create recipe</Text>

      <Space small />

      <form>
        <div className='section'>
          <Input
            label='title'
            name='title'
            placeholder='Berenjenas rellenas'
            onChange={handleOnChange}
            value={recipeData.title}
          />

          <Space small />
        </div>

        <Space medium />

        <div className='section'>
          <Text isSubtitle>Steps</Text>

          <Space extraSmall />

          {recipeData.steps.map((eachStep, index) => (
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
            isPrimary
            className='no-submit'
            type='button'
            disabled={recipeData.steps[recipeData.steps.length - 1] === ''}
          >
            Add step
          </Button>
        </div>

        <Space medium />

        <div className='section'>
          <Text isSubtitle>Ingredients</Text>

          <Space extraSmall />

          <Button
            small
            isPrimary
            iconLeft={faCartPlus}
            onClick={() => setShowCreateIngredient(true)}
          >
            Create ingredient
          </Button>

          {showCreateIngredient && (
            <Modal
              className='ingredient-modal'
              onClose={setShowCreateIngredient}
            >
              <IngredientForm onCreate={onCreateIngredient} />
            </Modal>
          )}

          <Space small />

          <Space small />

          {recipeData.ingredients.map((eachIngredient, index) => {
            const ingredientOption = eachIngredient.ingredient && {
              label: eachIngredient.ingredient?.name,
              value: eachIngredient,
            };

            return (
              <React.Fragment key={`ingredient-measure-${index}`}>
                <div className='grid-container'>
                  <Input
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
                      placeholder='quantity'
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
                    disabled={!recipeData.ingredients[index]}
                  />
                </div>

                <Space extraSmall />
              </React.Fragment>
            );
          })}

          <Button
            onClick={handleAddIngredient}
            iconLeft={faPlus}
            type='button'
            isPrimary
            disabled={
              !recipeData.ingredients[recipeData.ingredients.length - 1]
                ?.ingredient || ingredientsOptions.length === 0
            }
            className='cols-1 cart-cta no-submit'
          >
            Add ingredient to recipe
          </Button>
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
                value={recipeData.calories}
                type='number'
              />
            </div>

            <div className='cols-1'>
              <Input
                label='fats'
                name='fats'
                placeholder='0'
                onChange={handleOnChange}
                value={recipeData.fats}
                type='number'
              />
            </div>

            <div className='cols-1'>
              <Input
                label='proteins'
                name='proteins'
                placeholder='0'
                onChange={handleOnChange}
                value={recipeData.proteins}
                type='number'
              />
            </div>

            <div className='cols-1'>
              <Input
                label='carbohydrates'
                name='carbohydrates'
                placeholder='0'
                onChange={handleOnChange}
                value={recipeData.carbohydrates}
                type='number'
              />
            </div>
          </div>

          <Space small />
        </div>

        <Space medium />

        <div className='section grid-container'>
          <div className='cols-3'>
            <Input
              label='image'
              name='image'
              onChange={handleOnChange}
              value={recipeData.image}
              type='file'
            />
          </div>

          <div className='cols-1'>
            <Input
              label='minutes'
              name='minutes'
              placeholder='0'
              onChange={handleOnChange}
              value={recipeData.minutes}
              type='number'
            />
          </div>

          <Space extraSmall />
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
              recipeData.categories
                ? categoriesEnum.filter(cat =>
                    recipeData.categories?.includes(cat.value)
                  )
                : []
            }
          />

          <Space extraSmall />
        </div>

        <Space medium />

        <div className='content-on-the-right'>
          {isEdit ? (
            <Button
              isPrimary
              iconLeft={faEdit}
              onClick={handleEditRecipe}
              type='submit'
            >
              Edit recipe
            </Button>
          ) : (
            <Button
              isPrimary
              iconLeft={faAdd}
              onClick={handleCreateRecipe}
              type='submit'
            >
              Create recipe
            </Button>
          )}
        </div>

        <Space small />
      </form>
    </div>
  );
}

export default RecipeForm;
