import React, { useEffect, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import PlanningSelector from '../components/marathon/PlanningSelector';
import Space from '../components/space/Space';
import Text from '../components/text/Text';
import frontRoutes from '../config/frontRoutes';
import { useMarathon } from '../context/marathonContext';
import RecipeCard from '../components/recipes/RecipeCard';
import dietsEnum from '../config/enums/dietsEnum';
import { useUser } from '../context/userContext';
import { useTranslation } from 'react-i18next';
import calculateEnergy, {
  createUniqueIngredientsList,
} from '../utils/calculateEnergy';

function Diet({ setCurrentDay }) {
  const { t } = useTranslation();
  const [handleSelectDay, isError] = useOutletContext();
  const { user } = useUser();
  const navigate = useNavigate();
  const { dayDetails, marathon } = useMarathon();
  const [mealsList, setMealsList] = useState([]);
  const [todayIngredients, setTodayIngredients] = useState([]);
  const [currentDiet, setCurrentDiet] = useState(dietsEnum[0].value);

  const handleSelectDiet = diet => {
    let list = dayDetails.meals;

    if (diet) {
      setCurrentDiet(diet);
      list = list.filter(ele => ele.diet === diet);
    }

    setMealsList(list);
  };

  useEffect(() => {
    if (dayDetails) {
      handleSelectDiet(currentDiet);
    }
  }, [dayDetails]);

  const navigateToRecipeDetail = meal => {
    navigate(frontRoutes.dietDetailsMain.replace(':id', meal._id));
  };

  useEffect(() => {
    if (!mealsList.length > 0) {
      return;
    }

    const duplicatedList = mealsList.flatMap(ele => ele.recipe.ingredients);
    const reducedList = createUniqueIngredientsList(duplicatedList);

    setTodayIngredients(reducedList);
  }, [mealsList]);

  if (!marathon) {
    return null;
  }

  return (
    <div className='diet-tab'>
      <div className='content-on-the-left'>
        <Text isTitle>{t('todayDiet')}</Text>

        <div className='propiedades'>
          <div className='propiedad'>
            <Text isSubtitle>{t('kcal')}: </Text>
            <Text>{calculateEnergy('calories', todayIngredients, user)}</Text>
          </div>

          <div className='propiedad'>
            <Text isSubtitle>{t('prot')}: </Text>
            <Text>{calculateEnergy('proteins', todayIngredients, user)}</Text>
          </div>

          <div className='propiedad'>
            <Text isSubtitle>{t('fat')}: </Text>
            <Text>{calculateEnergy('fats', todayIngredients, user)}</Text>
          </div>

          <div className='propiedad'>
            <Text isSubtitle>{t('carbh')}: </Text>
            <Text>
              {calculateEnergy('carbohydrates', todayIngredients, user)}
            </Text>
          </div>
        </div>
      </div>

      <Space medium />

      <PlanningSelector
        marathon={marathon}
        setCurrentDay={handleSelectDay}
        isFrontoffice
        baseUrl={frontRoutes.diet}
        setCurrentDiet={handleSelectDiet}
        defaultDiet={currentDiet}
      />

      <Space big />

      {isError && user.isAdmin && <div>{t('configureInBackoffice')}</div>}

      <div className='recipes-list'>
        {!isError &&
          mealsList.length > 0 &&
          mealsList.map((eachRecipe, i) => (
            <div key={`recipe-${i}`}>
              <RecipeCard
                recipe={eachRecipe.recipe}
                onClick={() => navigateToRecipeDetail(eachRecipe)}
              />

              <Space medium />
            </div>
          ))}
      </div>
    </div>
  );
}

export default Diet;
