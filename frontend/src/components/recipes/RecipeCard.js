import React, { useEffect } from 'react';
import Text from '../text/Text';
import FOOD_IMG from '../../styles/assets/food.png';
import Space from '../space/Space';
import { useGetImageUrlQuery } from '../../slices/imagesApiSlice';
import Spinner from '../spinner/Spinner';
import toast from 'react-hot-toast';
import calculateEnergy from '../../utils/calculateEnergy';
import { useUser } from '../../context/userContext';
import { useTranslation } from 'react-i18next';

function RecipeCard({ recipe, meal = '', onClick }) {
  const { t } = useTranslation();
  const { user } = useUser();

  const {
    data: imageS3,
    isLoading,
    refetch,
  } = useGetImageUrlQuery({
    url: recipe?.image?.url,
  });

  const refetchImage = async () => {
    try {
      await refetch(recipe?.image?.url);
    } catch (err) {
      toast.error(t('errorImage'));
    }
  };

  useEffect(() => {
    if (recipe?.image?.url) {
      refetchImage();
    }
  }, [recipe?.image?.url]);

  if (!recipe) {
    return null;
  }

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

            <Text isUppercase className='title'>
              {recipe.title}
            </Text>

            {meal && <Space medium />}
          </div>

          <Text className='recipe-card-data'>
            {!!recipe.minutes && (
              <>
                {recipe.minutes} <span>{t('min')}</span>
                <span className='decolored'> | </span>
              </>
            )}
            {calculateEnergy('calories', recipe.ingredients, user)}
            <span> {t('kcal')}</span>
          </Text>
        </div>
      </div>
    </button>
  );
}

export default RecipeCard;
