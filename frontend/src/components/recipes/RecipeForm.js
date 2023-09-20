import React, { useState } from 'react';
import toast from 'react-hot-toast';
import Text from '../text/Text';
import Space from '../space/Space';
import Input from '../input/Input';
import Button from '../button/Button';
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

function RecipeForm({ recipe, onCreate }) {
  const [recipeData, setRecipeData] = useState(
    recipe || {
      steps: [''],
      ingredients: [{}],
    }
  );

  console.log(recipeData);

  const { data: ingredientsData } = useGetIngredientsQuery({});

  const handleOnChange = ({ files, name, value }) => {
    setRecipeData({ ...recipeData, [name]: value });
  };

  const handleOnChangeSteps = ({ name, value }) => {
    const steps = recipeData.steps;
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
    const ingredients = recipeData.ingredients;
    const position = inputName.split('ingredient')[1];
    const ingredientId = value;
    const { measure, name } = ingredientsData.ingredients.find(
      elem => elem._id === ingredientId
    );

    ingredients[position] = {
      quantity: 0,
      measure: measure.diminutive,
      ingredient: ingredientId,
      name,
    };

    setRecipeData({ ...recipeData, ingredients });
  };

  const handleIngredientMeasure = ({ name: inputName, value: quantity }) => {
    const ingredients = recipeData.ingredients;
    const position = inputName.split('measure')[1];

    ingredients[position] = {
      ...ingredients[position],
      quantity,
    };

    setRecipeData({ ...recipeData, ingredients });
  };

  const handleAddIngredient = () => {
    const ingredients = recipeData.ingredients;
    ingredients.push({});

    setRecipeData({ ...recipeData, ingredients });
  };

  const ingredientsOptions = ingredientsData
    ? ingredientsData.ingredients.map(eachIngredient => {
        return {
          name: eachIngredient.name,
          value: eachIngredient._id,
          disabled: recipeData.ingredients.find(
            ele => ele.ingredient === eachIngredient._id
          ),
        };
      })
    : [];

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
        <Input
          label='title'
          name='title'
          placeholder='Berenjenas rellenas'
          onChange={handleOnChange}
          value={recipeData.title}
        />

        <Space small />

        <div className='grid-container'>
          <div className='cols-3'>
            <Input
              label='image'
              name='minuimagetes'
              placeholder='0'
              onChange={handleOnChange}
              value={recipeData.minutes}
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
          <div className='content-left-and-right'>
            <Text isSubtitle>Ingredients</Text>

            <Button small isPrimary iconLeft={faCartPlus}>
              Create ingredient
            </Button>
          </div>

          <Space small />

          {recipeData.ingredients.map((eachIngredient, index) => (
            <React.Fragment key={`ingredient-${index}`}>
              <div className='grid-container'>
                <Input
                  name={`ingredient${index}`}
                  value={eachIngredient.name}
                  type='select'
                  selectOption='Select ingredient'
                  options={ingredientsOptions}
                  className='cols-2'
                  onChange={handleIngredientChange}
                />

                <div className='cols-1 measure'>
                  <Input
                    name={`measure${index}`}
                    type='number'
                    placeholder='quantity'
                    onChange={handleIngredientMeasure}
                    value={eachIngredient.quantity}
                  />

                  <Text>{recipeData.ingredients[index].measure || ''}</Text>
                </div>

                <Button
                  onClick={() => {}}
                  iconLeft={faTrash}
                  onlyIcon
                  type='button'
                  isPrimary
                  className='cols-1 no-submit'
                  small
                  disabled={
                    !recipeData.ingredients[recipeData.ingredients.length - 1]
                      .name
                  }
                />
              </div>

              <Space extraSmall />
            </React.Fragment>
          ))}

          <Button
            onClick={handleAddIngredient}
            iconLeft={faPlus}
            type='button'
            isPrimary
            disabled={
              !recipeData.ingredients[recipeData.ingredients.length - 1].name
            }
            className='cols-1 cart-cta no-submit'
          >
            Add ingredient
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

          <Space extraSmall />
        </div>

        <Space medium />

        <div className='content-on-the-right'>
          <Button
            isPrimary
            iconLeft={faAdd}
            onClick={handleCreateRecipe}
            type='submit'
          >
            Create recipe
          </Button>

          <Button
            isPrimary
            iconLeft={faEdit}
            onClick={handleEditRecipe}
            type='submit'
          >
            Edit recipe
          </Button>
        </div>

        <Space small />
      </form>
    </div>
  );
}

export default RecipeForm;
