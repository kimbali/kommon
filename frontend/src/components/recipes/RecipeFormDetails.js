import React from 'react';
import { getMeasureDiminutive } from '../../config/enums/measuresEnum';
import Text from '../text/Text';
import Space from '../space/Space';
import ResumeTable from '../resumeTable/ResumeTable';
import Button from '../button/Button';
import { faEdit, faFolderPlus } from '@fortawesome/free-solid-svg-icons';
import categoriesEnum from '../../config/enums/categoriesEnum';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function RecipeFormDetails({
  data: recipeDetails,
  handleEditRecipe,
  handleCreateRecipe,
  isEdit,
}) {
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
    categories,
  } = recipeDetails;

  return (
    <div className='recipe-form-details'>
      <Text isTitle>{title || 'Missing title'}</Text>

      <Space small />

      {image && <img alt={title} src={`${image}`} />}

      <Space medium />

      <Text isSectionTitle>Ingredients</Text>

      <Space small />

      {ingredients.length > 0 && ingredients[0] && (
        <ResumeTable
          list={ingredients.map(ele => {
            if (!ele.ingredient) {
              return {};
            }
            return {
              name: ele.ingredient?.name,
              value: `${ele.quantity || 0} ${getMeasureDiminutive(
                ele.ingredient?.measure
              )}`,
            };
          })}
        />
      )}

      <Space medium />

      <Text isSectionTitle>
        Steps - <span className='secondary'>{minutes || 0} min</span>
      </Text>

      <Space extraSmall />

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

      <div className='propiedades'>
        <div className='propiedad'>
          <Text isSubtitle>kcal</Text>
          <Text>{calories || '0'}</Text>
        </div>

        <div className='propiedad'>
          <Text isSubtitle>prot</Text>
          <Text>{proteins || '0'}</Text>
        </div>

        <div className='propiedad'>
          <Text isSubtitle>Fats</Text>
          <Text>{fats || '0'}</Text>
        </div>

        <div className='propiedad'>
          <Text isSubtitle>carbh</Text>
          <Text>{carbohydrates || '0'}</Text>
        </div>
      </div>

      <Space medium />

      <div className='categories'>
        {categoriesEnum.map(categoryEnum => {
          const isActive = categories?.includes(categoryEnum.value);

          return (
            <div
              key={`category-${categoryEnum.value}`}
              className={`category ${isActive ? 'active' : ''}`}
            >
              <FontAwesomeIcon icon={categoryEnum.svg} />
              <Text>{categoryEnum.label}</Text>
            </div>
          );
        })}
      </div>

      <Space big />

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
            iconLeft={faFolderPlus}
            onClick={handleCreateRecipe}
            type='submit'
          >
            Create recipe
          </Button>
        )}
      </div>

      <Space small />
    </div>
  );
}

export default RecipeFormDetails;
