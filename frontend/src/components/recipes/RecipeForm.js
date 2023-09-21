import React, { useState } from 'react';
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
  useUploadRecipeImageMutation,
} from '../../slices/recipesApiSlice';
import IngredientForm from '../ingredients/IngredientForm';

function RecipeForm({ recipe, onCreate, isEdit }) {
  const [showCreateIngredient, setShowCreateIngredient] = useState(false);
  const [recipeData, setRecipeData] = useState(
    recipe || {
      steps: [''],
      ingredients: [{}],
    }
  );

  const { data: ingredientsData } = useGetIngredientsQuery({});
  const [uploadRecipeImage, { isLoading: loadingUpload }] =
    useUploadRecipeImageMutation();

  const handleOnChange = ({ name, value }) => {
    setRecipeData({ ...recipeData, [name]: value });
  };

  const handleUploadImage = async ({ value }) => {
    const formData = new FormData();
    formData.append('image', value);
    try {
      const res = await uploadRecipeImage(formData).unwrap();
      toast.success(res.message);

      setRecipeData({ ...recipeData, image: res.image });
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
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
    const ingredients = recipeData.ingredients;
    const position = inputName.split('ingredient')[1];
    const ingredientId = value;

    ingredients[position] = {
      quantity: 0,
      ingredient: ingredientId,
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

  const handleDeleteIngredientFromList = index => {
    let ingredients = recipeData.ingredients.filter((_, i) => i !== index);

    if (ingredients.length === 0) {
      ingredients[0] = {};
    }

    setRecipeData({ ...recipeData, ingredients });
  };

  const createIngredientHandler = () => {
    setShowCreateIngredient(true);
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
              name='image'
              onChange={handleUploadImage}
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

          <Button
            small
            isPrimary
            iconLeft={faCartPlus}
            onClick={createIngredientHandler}
          >
            Create ingredient
          </Button>

          {showCreateIngredient && (
            <Modal onClose={setShowCreateIngredient}>
              <IngredientForm />
            </Modal>
          )}

          <Space small />

          {recipeData.ingredients.map((eachIngredient, index) => {
            const currentIngredient = ingredientsData?.ingredients.find(
              elem => {
                if (!isEdit) {
                  return elem._id === eachIngredient.ingredient;
                } else {
                  return elem._id === eachIngredient.ingredient?._id;
                }
              }
            );

            return (
              <React.Fragment key={`ingredient-${index}`}>
                <div className='grid-container'>
                  <Input
                    name={`ingredient${index}`}
                    value={currentIngredient?.name}
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

                    <Text>{currentIngredient?.measure?.diminutive || ''}</Text>
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
              !recipeData.ingredients[recipeData.ingredients.length - 1]?.name
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
