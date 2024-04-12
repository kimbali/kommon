import React, { useEffect, useState } from 'react';
import Text from '../components/text/Text';
import Space from '../components/space/Space';
import WorkoutCard from '../components/workouts/WorkoutCard';
import RecipeCard from '../components/recipes/RecipeCard';
import Input from '../components/input/Input';
import Modal from '../components/modal/Modal';
import RecipeDetails from './RecipeDetails';
import frontRoutes from '../config/frontRoutes';
import { useNavigate } from 'react-router-dom';
import { useMarathon } from '../context/marathonContext';
import MeditationCard from '../components/meditation/MeditationCard';
import { useUpdateProgressMutation } from '../slices/progressApiSlice';
import { useProgress } from '../context/progressContext';
import { useTranslation } from 'react-i18next';
import { useGetDietsQuery } from '../slices/dietsApiSlice';
import BodyParameter from '../components/progress/BodyParameter';
import { useConfig } from '../context/configContext';
import { calculateDaysDifference } from '../utils/formatDate';

function Main() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { config } = useConfig();
  const { dayDetails, dayDetailsLoading } = useMarathon();
  const { userProgress, updateUserProgress } = useProgress();

  const [showRecipe, setShowRecipe] = useState();
  const [mealsList, setMealsList] = useState([]);
  const [untilNext, setUntilNext] = useState();

  const [updateProgress] = useUpdateProgressMutation();
  const { data: dietsData } = useGetDietsQuery({ keyword: 'YES' });

  useEffect(() => {
    if (dietsData && dayDetails) {
      const list = dayDetails.meals.filter(
        ele => ele.diet === dietsData.diets[0]._id
      );
      setMealsList(list);
    }
  }, [dietsData, dayDetails]);

  const isCheckedTask = task => {
    return userProgress?.tasksChecked?.findIndex(ele => ele === task._id) > -1;
  };

  const handleCheckTask = async task => {
    let updatedList;

    if (isCheckedTask(task)) {
      updatedList = userProgress.tasksChecked?.filter(ele => ele !== task._id);
    } else {
      updatedList = userProgress.tasksChecked?.concat(task._id);
    }

    await updateProgress({ ...userProgress, tasksChecked: updatedList });
    updateUserProgress({ ...userProgress, tasksChecked: updatedList });
  };

  const navigateToWorkouts = () => {
    navigate(frontRoutes.workouts);
  };

  const navigateToMeditations = () => {
    navigate(frontRoutes.meditations);
  };

  useEffect(() => {
    if (userProgress) {
      const days = calculateDaysDifference(
        new Date(),
        userProgress.marathon?.startDate
      );

      setUntilNext(days);
    }
  }, [userProgress]);

  if (dayDetailsLoading) {
    return;
  }

  if (!dayDetails) {
    return (
      <div className='message-box'>
        <div className='message-box-content'>
          <Text className='days-remaining' fontSize='24' isBold>
            {t('quedan')}
          </Text>

          <Space medium />

          <Text color='primary' fontSize='18' isBold>
            {untilNext ? `${untilNext} ${t('days')}` : ''}
          </Text>

          <Space medium />

          <Text>{t('noMarathonYetText')}</Text>

          <Space small />

          <Text>{t('noMarathonYetTextTwo')}</Text>

          <Space small />

          <Text>{t('noMarathonYetTextThree')}</Text>
        </div>
      </div>
    );
  }

  return (
    <div className='main-tab'>
      <Text isTitle>{t('todayWorkouts')}</Text>

      <Space small />

      <div className='marathon-config-scrollx no-fix-content'>
        {dayDetails?.workouts.length > 0 &&
          dayDetails.workouts.map((eachWorkout, i) => (
            <div
              className={`single-workout ${i % 2 ? 'even' : 'pair'}`}
              key={`${i}-workout`}
            >
              <WorkoutCard
                data={eachWorkout}
                onClick={navigateToWorkouts}
                hideTitle
              />
            </div>
          ))}
      </div>

      <Space medium />

      <Text isSubtitle>{t('todayDiet')}</Text>

      <Space small />

      <div className='marathon-config-scrollx'>
        {mealsList.map((eachMeal, i) => (
          <div className='single-recipe' key={`${i}-recipe`}>
            <RecipeCard
              recipe={eachMeal.recipe}
              onClick={() => setShowRecipe(eachMeal.recipe)}
            />

            <Space small />
          </div>
        ))}
      </div>

      <Space medium />

      {config?.activeMeditations && (
        <>
          <Text isTitle>{t('todayMeditations')}</Text>

          <Space small />

          <div className='marathon-config-scrollx no-fix-content'>
            {dayDetails?.meditations.length > 0 &&
              dayDetails.meditations.map((ele, i) => (
                <div className='single-workout' key={`${i}-meditation`}>
                  <MeditationCard data={ele} onClick={navigateToMeditations} />
                </div>
              ))}
          </div>

          <Space medium />
        </>
      )}

      <div className='content-left-and-right'>
        <div className='content'>
          <Text isSubtitle>{t('todoList')}</Text>

          <Space extraSmall />

          <div className='container'>
            <Text className='decolored-title'>{t('todayTasks')}</Text>

            <Space small />

            <form>
              {dayDetails?.tasks.length > 0 &&
                dayDetails.tasks.map((eachTask, i) => {
                  const isChecked = isCheckedTask(eachTask);

                  return (
                    <div className='single-task' key={`${i}-task`}>
                      <Input
                        type='checkbox'
                        className={isChecked ? 'checked' : ''}
                        label={eachTask.title}
                        value={isChecked}
                        onChange={() => handleCheckTask(eachTask)}
                      />
                    </div>
                  );
                })}
            </form>
          </div>
        </div>

        <div className='content'>
          <BodyParameter
            title={t('weight')}
            progress={userProgress?.weight.value}
            measure='kg'
          />
        </div>
      </div>

      {showRecipe && (
        <Modal scroll onClose={setShowRecipe}>
          <RecipeDetails recipe={showRecipe} />
        </Modal>
      )}
    </div>
  );
}

export default Main;
