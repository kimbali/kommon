import React, { useEffect, useState } from 'react';
import Button from '../components/button/Button';
import {
  faEdit,
  faMagnifyingGlass,
  faSort,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import Space from '../components/space/Space';
import Input from '../components/input/Input';
import LoadingError from '../components/loadingError/LoadingError';
import Modal from '../components/modal/Modal';
import {
  useDeleteIngredientMutation,
  useGetIngredientsQuery,
} from '../slices/ingredientsApiSlice';
import IngredientForm from '../components/ingredients/IngredientForm';
import ConfirmModal from '../components/modal/ConfirmModal';
import { getMeasureDiminutive } from '../config/enums/measuresEnum';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getAllergyLabel } from '../config/enums/allergiesEnum';
import sortBy from '../utils/sortBy';
import { getSupermarketLabel } from '../config/enums/supermarketEnum';
import { useTranslation } from 'react-i18next';

function IngredientsConfig() {
  const { t } = useTranslation();
  const [searchValue, setSearchValue] = useState('');
  const [keywordValue, setKeywordValue] = useState('');
  const [showFormModal, setShowFormModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentIngredient, setCurrentIngredient] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const [ingredientsList, setIngredientsList] = useState([]);

  const handleSearchSubmit = e => {
    e.preventDefault();

    setKeywordValue(searchValue);
  };

  const [deleteIngredient] = useDeleteIngredientMutation();
  const { data, isLoading, isError, refetch } = useGetIngredientsQuery({
    keyword: keywordValue,
  });

  useEffect(() => {
    if (data) {
      setIngredientsList(data.ingredients);
    }
  }, [data]);

  const onSuccess = async () => {
    setShowFormModal(false);
    setCurrentIngredient(null);
    await refetch();
  };

  const handleEdit = task => {
    setShowFormModal(true);
    setCurrentIngredient(task);
  };

  const handleDelete = async () => {
    await deleteIngredient(showDeleteModal._id);
    setShowDeleteModal(false);
    refetch();
  };

  const sortByName = () => {
    const listSorted = sortBy(data?.ingredients, 'name', sortOrder);

    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    setIngredientsList(listSorted);
  };

  if (isLoading || isError) {
    return <LoadingError isLoading={isLoading} isError={isError} />;
  }

  return (
    <div>
      <div className='content-left-and-right'>
        <Button isPrimary onClick={() => setShowFormModal(true)}>
          {t('createIngredient')}
        </Button>

        <form onSubmit={handleSearchSubmit} className='search-input'>
          <Input
            onChange={({ value }) => setSearchValue(value)}
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

      <table>
        <thead>
          <tr>
            <th>
              <button onClick={sortByName}>
                {t('name')} <FontAwesomeIcon icon={faSort} />
              </button>
            </th>
            <th>{t('measure')}</th>
            <th>{t('allergies')}</th>
            <th>{t('supermarket')}</th>
            <th>{t('kcal')}</th>
            <th>{t('prot')}</th>
            <th>{t('fats')}</th>
            <th>{t('carbh')}</th>
            <th>{t('edit')}</th>
            <th>{t('trash')}</th>
          </tr>
        </thead>
        <tbody>
          {ingredientsList.map((ingredient, i) => (
            <tr key={`ingredient-item-${i}`}>
              <td>{ingredient.name}</td>

              <td>{getMeasureDiminutive(ingredient.measure)}</td>
              <td>{getAllergyLabel(ingredient.allergy)}</td>
              <td>{getSupermarketLabel(ingredient.supermarket)}</td>

              <td className='center-text'>{ingredient.calories}</td>
              <td className='center-text'>{ingredient.proteins}</td>
              <td className='center-text'>{ingredient.fats}</td>
              <td className='center-text'>{ingredient.carbohydrates}</td>

              <td className='only-icon'>
                <Button
                  className='background-2'
                  onlyIcon
                  iconLeft={faEdit}
                  onClick={() => handleEdit(ingredient)}
                />
              </td>

              <td className='only-icon'>
                <Button
                  className='background-2'
                  onlyIcon
                  iconLeft={faTrash}
                  onClick={() => setShowDeleteModal(ingredient)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showFormModal && (
        <Modal scroll onClose={setShowFormModal} isSecondary>
          <IngredientForm
            onSuccess={onSuccess}
            data={currentIngredient}
            onCancel={() => setShowFormModal(false)}
          />
        </Modal>
      )}

      {showDeleteModal && (
        <ConfirmModal
          onConfirm={handleDelete}
          onClose={setShowDeleteModal}
          title='Delete ingredient'
          text={`${t('confirmDelete')} ${showDeleteModal.name}`}
          confirmLabel={t('delete')}
        />
      )}

      <Space medium />
    </div>
  );
}

export default IngredientsConfig;
