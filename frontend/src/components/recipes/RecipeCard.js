import React from 'react';
import Text from '../text/Text';
import FOOD_IMG from '../../styles/assets/food.png';
import Space from '../space/Space';
import { useGetImageUrlQuery } from '../../slices/imagesApiSlice';
import Spinner from '../spinner/Spinner';

function RecipeCard({ recipe, meal = '', onClick }) {
  const { data: imageS3, isLoading } = useGetImageUrlQuery(
    {
      url: recipe?.image?.url,
    },
    { skip: !recipe?.image?.url }
  );

  return (
    <button onClick={onClick} className='recipe-card-cta'>
      <div className='recipe-card'>
        <div className='recipe-card-details'>
          <div>
            {isLoading ? (
              <div className='image-loader-wrapper'>
                <Spinner type='image-loader' />
              </div>
            ) : (
              <div
                className='food-image'
                style={{
                  backgroundImage: `url(${imageS3?.signedUrl || FOOD_IMG})`,
                }}
              ></div>
            )}

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
