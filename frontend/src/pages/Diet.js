import React, { useEffect, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import PlanningSelector from '../components/marathon/PlanningSelector';
import Space from '../components/space/Space';
import Text from '../components/text/Text';
import frontRoutes from '../config/frontRoutes';
import { useMarathon } from '../context/marathonContext';
import RecipeCard from '../components/recipes/RecipeCard';
import { useUser } from '../context/userContext';
import { useTranslation } from 'react-i18next';
import { createUniqueIngredientsList } from '../utils/calculateEnergy';
import { useGetDietsQuery } from '../slices/dietsApiSlice';
import EnergyDetails from '../components/recipes/EnergyDetails';

function Diet() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isError] = useOutletContext();
  const { user } = useUser();
  const { dayDetails, marathon } = useMarathon();

  const { data: dietsData } = useGetDietsQuery({ keyword: 'YES' });

  const [mealsList, setMealsList] = useState([]);
  const [todayIngredients, setTodayIngredients] = useState([]);
  const [currentDiet, setCurrentDiet] = useState();

  const handleSelectDiet = diet => {
    let list = dayDetails?.meals;

    if (diet) {
      setCurrentDiet(diet);
      list = list?.filter(ele => ele.diet === diet);
    }

    setMealsList(list);
  };

  useEffect(() => {
    if (dayDetails && dietsData) {
      const firstDietOfTheList = dietsData.diets[0]._id;
      handleSelectDiet(currentDiet || firstDietOfTheList);
    }
  }, [dayDetails, dietsData]);

  const navigateToRecipeDetail = meal => {
    navigate(frontRoutes.dietDetailsMain.replace(':id', meal._id));
  };

  useEffect(() => {
    if (!mealsList?.length > 0) {
      setTodayIngredients([]);
      return;
    }

    const duplicatedList = mealsList
      .filter(ele => ele.diet === currentDiet)
      .flatMap(ele => ele.recipe?.ingredients);
    const reducedList = createUniqueIngredientsList(duplicatedList);

    setTodayIngredients(reducedList);
  }, [mealsList, currentDiet]);

  if (!marathon) {
    return null;
  }

  return (
    <div className='diet-tab'>
      <div className='content-on-the-left'>
        <Text isTitle>{t('todayDiet')}</Text>
        <EnergyDetails ingredients={todayIngredients} />
      </div>

      <Space medium />

      <PlanningSelector
        isFrontoffice
        baseUrl={frontRoutes.diet}
        setCurrentDiet={handleSelectDiet}
        currentDiet={currentDiet}
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
