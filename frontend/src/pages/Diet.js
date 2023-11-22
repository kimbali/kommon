import React, { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import PlanningSelector from '../components/marathon/PlanningSelector';
import Space from '../components/space/Space';
import Text from '../components/text/Text';

import frontRoutes from '../config/frontRoutes';
import { useMarathon } from '../context/marathonContext';
import { useSelector } from 'react-redux';
import RecipeCard from '../components/recipes/RecipeCard';

function Diet({ setCurrentDay }) {
  const [handleSelectDay, isError] = useOutletContext();
  const { userInfo } = useSelector(state => state.auth);

  const navigate = useNavigate();
  const { dayDetails, marathon } = useMarathon();
  const [mealsList, setMealsList] = useState([]);

  const handleSelectDiet = diet => {
    let list = dayDetails.meals;

    if (diet) {
      list = list.filter(ele => ele.diet === diet);
    }

    setMealsList(list);
  };

  const navigateToRecipeDetail = recipe => {
    navigate(frontRoutes.dietDetailsMain.replace(':id', recipe._id));
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
