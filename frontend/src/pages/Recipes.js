import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetRecipesQuery } from '../slices/recipesApiSlice';
import Button from '../components/button/Button';
import Input from '../components/input/Input';
import { faMagnifyingGlass, faPlus } from '@fortawesome/free-solid-svg-icons';
import Space from '../components/space/Space';
import RecipeCard from '../components/recipes/RecipeCard';
import Modal from '../components/modal/Modal';
import RecipeForm from '../components/recipes/RecipeForm';
import frontRoutes from '../config/frontRoutes';
import LoadingError from '../components/loadingError/LoadingError';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

function Recipes() {
  const { t } = useTranslation();
  const [searchValue, setSearchValue] = useState('');
  const [keywordValue, setKeywordValue] = useState('');
  const [showRecipeModal, setShowRecipeModal] = useState(false);
  const navigate = useNavigate();

  const {
    data,
    isLoading,
    isError,
    refetch: refetchRecipes,
  } = useGetRecipesQuery({
    keyword: keywordValue,
  });

  const fetchData = async () => {
    try {
      await refetchRecipes();
    } catch (err) {
      toast.error(t('refresh'));
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearchValueChange = ({ value }) => {
    setSearchValue(value);
  };

  const handleSearchSubmit = e => {
    e.preventDefault();

    setKeywordValue(searchValue);
  };

  const handleCreateRecipe = () => {
    setShowRecipeModal(true);
  };

  const handleCardClick = recipeId => {
    navigate(frontRoutes.recipeDetails.replace(':id', recipeId));
  };

  const handleOnCreateRecipe = () => {
    setShowRecipeModal(false);
    refetchRecipes();
  };

  if (isLoading || isError) {
    return <LoadingError isLoading={isLoading} isError={isError} />;
  }

  return (
    <div>
      <div className='content-left-and-right'>
        <Button onClick={handleCreateRecipe} iconLeft={faPlus} isPrimary>
          {t('createRecipe')}
        </Button>

        <form onSubmit={handleSearchSubmit} className='search-input'>
          <Input
            onChange={handleSearchValueChange}
            placeholder={t('searchTitle')}
            iconLeft={faMagnifyingGlass}
            isSecondary
            name='search'
            value={searchValue}
            type='search'
          />
          <Button type='submit' isPrimary iconLeft={faMagnifyingGlass} />
        </form>
      </div>

      <Space medium />

      <ul className='card-list'>
        {data.recipes?.map((eachRecipe, index) => (
          <li className='card-item' key={`recipe-${index}`}>
            <RecipeCard
              recipe={eachRecipe}
              onClick={() => handleCardClick(eachRecipe._id)}
            />

            <Space medium />
          </li>
        ))}
      </ul>

      {showRecipeModal && (
        <Modal
          fullWidth
          className='recipe-modal'
          scroll
          onClose={setShowRecipeModal}
        >
          <RecipeForm onCreate={handleOnCreateRecipe} />
        </Modal>
      )}
    </div>
  );
}

export default Recipes;
