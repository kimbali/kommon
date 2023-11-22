import React, { useEffect, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import PlanningSelector from '../components/marathon/PlanningSelector';
import Space from '../components/space/Space';
import Text from '../components/text/Text';

import frontRoutes from '../config/frontRoutes';
import { useMarathon } from '../context/marathonContext';
import { useSelector } from 'react-redux';
import RecipeCard from '../components/recipes/RecipeCard';
import dietsEnum from '../config/enums/dietsEnum';

function Diet({ setCurrentDay }) {
  const [handleSelectDay, isError] = useOutletContext();
  const { userInfo } = useSelector(state => state.auth);
  const navigate = useNavigate();
  const { dayDetails, marathon } = useMarathon();
  const [mealsList, setMealsList] = useState([]);
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

  if (!marathon) {
    return null;
  }

  return (
    <div className='diet-tab'>
      <Text isTitle>Your diet for today</Text>

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

      {isError && userInfo.isAdmin && (
        <div>You should configure this day on the backoffice</div>
      )}

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
