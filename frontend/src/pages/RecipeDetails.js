import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import {
  useDeleteRecipeMutation,
  useGetRecipeDetailsQuery,
} from '../slices/recipesApiSlice';
import LoadingError from '../components/loadingError/LoadingError';
import Text from '../components/text/Text';
import Space from '../components/space/Space';
import ResumeTable from '../components/resumeTable/ResumeTable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import Button from '../components/button/Button';
import frontRoutes from '../config/frontUrls';
import ConfirmModal from '../components/modal/ConfirmModal';
import Modal from '../components/modal/Modal';
import RecipeForm from '../components/recipes/RecipeForm';
import { getMeasureDiminutive } from '../config/enums/measuresEnum';

function RecipeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const {
    data: recipeDetails,
    isLoading,
    isError,
    refetch,
  } = useGetRecipeDetailsQuery(id);

  const [deleteRecipe] = useDeleteRecipeMutation();

  const deleteHandler = async () => {
    try {
      await deleteRecipe(id);
      toast.success('Recipe deleted');
      navigate(frontRoutes.recipes);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const editHandler = () => {
    setShowEditModal(false);
    refetch();
  };

  if (isLoading || isError) {
    return <LoadingError isLoading={isLoading} isError={isError} />;
  }

  if (!recipeDetails) {
    return <Text>Recipe not found</Text>;
  }

  const {
    title,
    steps,
    ingredients,
    minutes,
    image,
    calories,
    proteins,
    fats,
    carbohydrates,
  } = recipeDetails;

  return (
    <>
      <div className='content-left-and-right'>
        <Text isTitle>{title}</Text>

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
      </div>

      <Space medium />

      <div className='recipe-details'>
        <div className='recipe-details-content'>
          {image && <img alt={title} src={`${image}`} />}

          <Space medium />

          <div className='propiedades'>
            <div className='propiedad'>
              <Text isSubtitle>kcal</Text>
              <Text>{calories}</Text>
            </div>

            <div className='propiedad'>
              <Text isSubtitle>prot</Text>
              <Text>{proteins}</Text>
            </div>

            <div className='propiedad'>
              <Text isSubtitle>Fats</Text>
              <Text>{fats}</Text>
            </div>

            <div className='propiedad'>
              <Text isSubtitle>carbh</Text>
              <Text>{carbohydrates}</Text>
            </div>
          </div>
        </div>

        <div className='recipe-details-content'>
          <Text className='steps-title' isSectionTitle>
            <span>Steps</span>
            <span>
              <FontAwesomeIcon icon={faClock} /> {minutes}
            </span>
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

          <Space medium />

          <Text isSectionTitle>Ingredients</Text>

          <Space small />

          {ingredients.length > 0 && ingredients[0] && (
            <ResumeTable
              list={ingredients.map(ele => {
                return {
                  name: ele.ingredient?.name,
                  value: `${ele.quantity} ${getMeasureDiminutive(
                    ele.ingredient?.measure
                  )}`,
                };
              })}
            />
          )}
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
