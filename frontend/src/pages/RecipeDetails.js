import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import {
  useDeleteRecipeMutation,
  useGetRecipeDetailsQuery,
} from '../slices/recipesApiSlice';
import { useGetImageUrlQuery } from '../slices/imagesApiSlice';
import Text from '../components/text/Text';
import Space from '../components/space/Space';
import ResumeTable from '../components/resumeTable/ResumeTable';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import Button from '../components/button/Button';
import frontRoutes from '../config/frontRoutes';
import ConfirmModal from '../components/modal/ConfirmModal';
import Modal from '../components/modal/Modal';
import RecipeForm from '../components/recipes/RecipeForm';
import { getMeasureDiminutive } from '../config/enums/measuresEnum';
import calculateEnergy, { KcalReglaDeTres } from '../utils/calculateEnergy';
import { useUser } from '../context/userContext';

function RecipeDetails({ recipe }) {
  const { id } = useParams();
  const { user } = useUser();
  const navigate = useNavigate();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [recipeDetails, setRecipeDetails] = useState();

  const { data, refetch } = useGetRecipeDetailsQuery(id, { skip: !!recipe });

  useEffect(() => {
    setRecipeDetails(recipe || data);
  }, [data, recipe]);

  const { data: imageS3 } = useGetImageUrlQuery(
    {
      url: recipeDetails?.image?.url,
    },
    { skip: !recipeDetails?.image?.url }
  );

  const [deleteRecipe] = useDeleteRecipeMutation();

  const deleteHandler = async () => {
    try {
      await deleteRecipe(id);
      toast.success('Recipe deleted');
      navigate(frontRoutes.dietsConfig);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const editHandler = async () => {
    setShowEditModal(false);
    await refetch();
  };

  if (!recipeDetails) {
    return <Text>Recipe not found</Text>;
  }

  const { title, steps, ingredients, minutes } = recipeDetails;

  return (
    <>
      {!recipe && (
        <div className='content-on-the-right'>
          <Button
            onClick={() => setShowEditModal(true)}
            iconLeft={faEdit}
            isPrimary
          >
            Edit recipe
          </Button>

          <Button
            onClick={() => setShowDeleteModal(true)}
            iconLeft={faTrash}
            isSecondary
          >
            Delete recipe
          </Button>

          {showDeleteModal && (
            <ConfirmModal
              onConfirm={deleteHandler}
              onClose={setShowDeleteModal}
              title='Delete recipe'
              text={`Are you sure you whant to delete: ${title}`}
            />
          )}
        </div>
      )}

      <Space small />

      <Text isTitle>{title}</Text>

      <Space medium />

      <div className='recipe-details'>
        <div className='recipe-details-content'>
          <div
            className='food-image'
            style={{ backgroundImage: `url(${imageS3?.signedUrl})` }}
          ></div>

          <Space medium />

          <div className='propiedades'>
            <div className='propiedad'>
              <Text isSubtitle>Kcal</Text>
              <Text>{calculateEnergy('calories', ingredients, user)}</Text>
            </div>

            <div className='propiedad'>
              <Text isSubtitle>Prot</Text>
              <Text>{calculateEnergy('proteins', ingredients, user)}</Text>
            </div>

            <div className='propiedad'>
              <Text isSubtitle>Fats</Text>
              <Text>{calculateEnergy('fats', ingredients, user)}</Text>
            </div>

            <div className='propiedad'>
              <Text isSubtitle>Carbh</Text>
              <Text>{calculateEnergy('carbohydrates', ingredients, user)}</Text>
            </div>
          </div>
        </div>

        <div className='recipe-details-content  background-2'>
          <Text isSectionTitle>Ingredients</Text>

          <Space small />

          {ingredients.length > 0 && ingredients[0] && (
            <ResumeTable
              withBullets
              list={ingredients.map(ele => {
                return {
                  name: ele.ingredient?.name || '',
                  value: `(${
                    KcalReglaDeTres(ele.quantity, user) || ''
                  } ${getMeasureDiminutive(ele.ingredient?.measure)})`,
                };
              })}
            />
          )}

          <Space medium />

          <Text className='steps-title' isSectionTitle>
            <span>Instrucción ({minutes} MIN)</span>
          </Text>

          <Space small />

          <ol className='steps'>
            {steps.length > 0 &&
              steps[0] &&
              steps.map(
                (eachStep, index) =>
                  eachStep && (
                    <li className='step' key={`eachStep-${index}`}>
                      <Text>{index + 1}.</Text>
                      <Text>{eachStep}</Text>
                    </li>
                  )
              )}
          </ol>
        </div>
      </div>

      {showEditModal && (
        <Modal scroll onClose={setShowEditModal}>
          <RecipeForm isEdit recipe={recipeDetails} onCreate={editHandler} />
        </Modal>
      )}
    </>
  );
}

export default RecipeDetails;
