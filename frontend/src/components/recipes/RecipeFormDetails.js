import React from 'react';
import { getMeasureDiminutive } from '../../config/enums/measuresEnum';
import Text from '../text/Text';
import Space from '../space/Space';
import ResumeTable from '../resumeTable/ResumeTable';
import Button from '../button/Button';
import { faFolderPlus, faSave } from '@fortawesome/free-solid-svg-icons';
import mealsEnum from '../../config/enums/mealsEnum';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useGetImageUrlQuery } from '../../slices/imagesApiSlice';
import calculateEnergy from '../../utils/calculateEnergy';

function RecipeFormDetails({
  data: recipeDetails,
  handleEditRecipe,
  handleCreateRecipe,
  isEdit,
}) {
  const { title, steps, ingredients, minutes, image, meals } = recipeDetails;

  const { data: imageS3 } = useGetImageUrlQuery(
    {
      url: image?.url,
    },
    { skip: !image?.url }
  );

  return (
    <div className='recipe-form-details'>
      <Text isTitle>{title || 'Missing title'}</Text>

      <Space small />

      <div
        className='food-image'
        style={{ backgroundImage: `url(${imageS3?.signedUrl})` }}
      ></div>

      <Space medium />

      <Text isSectionTitle>Ingredients</Text>

      <Space small />

      {ingredients.length > 0 && ingredients[0] && (
        <ResumeTable
          withBullets
          list={ingredients.map(ele => {
            if (!ele.ingredient) {
              return {};
            }
            return {
              name: ele.ingredient?.name,
              value: `(${
                ele.quantity?.toLocaleString('de-DE') || 0
              } ${getMeasureDiminutive(ele.ingredient?.measure)})`,
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
          <Text isBold>KCAL</Text>
          <Text>{calculateEnergy('calories', ingredients)}</Text>
        </div>

        <div className='propiedad'>
          <Text isBold>PROT</Text>
          <Text>{calculateEnergy('proteins', ingredients)}</Text>
        </div>

        <div className='propiedad'>
          <Text isBold>FATS</Text>
          <Text>{calculateEnergy('fats', ingredients)}</Text>
        </div>

        <div className='propiedad'>
          <Text isBold>CARBH</Text>
          <Text>{calculateEnergy('carbohydrates', ingredients)}</Text>
        </div>
      </div>

      <Space medium />

      <div className='meals'>
        {mealsEnum.map(mealEnum => {
          const isActive = meals?.includes(mealEnum.value);

          return (
            <div
              key={`meal-${mealEnum.value}`}
              className={`meal ${isActive ? 'active' : ''}`}
            >
              <FontAwesomeIcon icon={mealEnum.svg} />
              <Text>{mealEnum.label}</Text>
            </div>
          );
        })}
      </div>

      <Space big />

      <div className='content-on-the-right'>
        {isEdit ? (
          <Button
            isPrimary
            iconLeft={faSave}
            onClick={handleEditRecipe}
            type='submit'
          >
            Save changes
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
