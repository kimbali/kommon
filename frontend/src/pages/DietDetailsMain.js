import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useMarathon } from '../context/marathonContext';
import Space from '../components/space/Space';
import Text from '../components/text/Text';
import { getMeasureDiminutive } from '../config/enums/measuresEnum';
import ResumeTable from '../components/resumeTable/ResumeTable';
import { useGetImageUrlQuery } from '../slices/imagesApiSlice';
import calculateEnergy, { KcalReglaDeTres } from '../utils/calculateEnergy';
import { useUser } from '../context/userContext';
import { useTranslation } from 'react-i18next';

function DietDetailsMain() {
  const { t } = useTranslation();
  const { id } = useParams();
  const { user } = useUser();
  const { dayDetails } = useMarathon();
  const [meal, setMeal] = useState();

  useEffect(() => {
    if (dayDetails && id) {
      const mealDetails = dayDetails.meals.find(ele => ele._id === id);
      setMeal(mealDetails);
    }
  }, [dayDetails, id]);

  const { data: imageS3 } = useGetImageUrlQuery(
    {
      url: meal?.recipe?.image?.url,
    },
    { skip: !meal?.recipe?.image?.url }
  );

  if (!meal) {
    return null;
  }

  const { title, steps, ingredients, minutes, carbohydrates } = meal?.recipe;

  return (
    <div>
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
              <Text isSubtitle>{t('kcal')}</Text>
              <Text>{calculateEnergy('calories', ingredients, user)}</Text>
            </div>

            <div className='propiedad'>
              <Text isSubtitle>{t('prot')}</Text>
              <Text>{calculateEnergy('proteins', ingredients, user)}</Text>
            </div>

            <div className='propiedad'>
              <Text isSubtitle>{t('fats')}</Text>
              <Text>{calculateEnergy('fats', ingredients, user)}</Text>
            </div>

            <div className='propiedad'>
              <Text isSubtitle>{t('carbh')}</Text>
              <Text>
                {calculateEnergy('carbohydrates', carbohydrates, user)}
              </Text>
            </div>
          </div>
        </div>

        <div className='recipe-details-content  background-2'>
          <Text isSectionTitle>{t('ingredients')}</Text>

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
            <span>
              {t('instruccion')} ({minutes} {t('min')})
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
        </div>
      </div>
    </div>
  );
}

export default DietDetailsMain;
