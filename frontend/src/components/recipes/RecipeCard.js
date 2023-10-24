import React from 'react';
import Text from '../text/Text';
import FOOD_IMG from '../../styles/assets/food.png';
import Space from '../space/Space';

function RecipeCard({ recipe, meal = '', onClick }) {
  return (
    <button onClick={onClick} className='recipe-card-cta'>
      <div className='recipe-card'>
        <div className='recipe-card-details'>
          <div>
            <div
              className='food-image'
              style={{ backgroundImage: `url(${recipe.image || FOOD_IMG})` }}
            ></div>

            <Space small />

            <Text className='meal'>{meal}</Text>

            <Space extraSmall />

            <Text className='title'>{recipe.title}</Text>

            {meal && <Space medium />}
          </div>

          <Text className='recipe-card-data'>
            {recipe.minutes} <span>min</span> | {recipe.calories}{' '}
            <span>kcal</span>
          </Text>
        </div>
      </div>
    </button>
  );
}

export default RecipeCard;
