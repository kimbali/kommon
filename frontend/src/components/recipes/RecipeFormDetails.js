import React from 'react';
import { getMeasureDiminutive } from '../../config/enums/measuresEnum';
import Text from '../text/Text';
import Space from '../space/Space';
import ResumeTable from '../resumeTable/ResumeTable';

function RecipeFormDetails({ data: recipeDetails }) {
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
              value: `${ele.quantity} ${getMeasureDiminutive(
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

      <Space small />
    </div>
  );
}

export default RecipeFormDetails;
