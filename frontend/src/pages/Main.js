import React, { useState } from 'react';
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
import dietsEnum from '../config/enums/dietsEnum';
import MeditationCard from '../components/meditation/MeditationCard';
import { useUpdateProgressMutation } from '../slices/progressApiSlice';
import { useProgress } from '../context/progressContext';
import { useTranslation } from 'react-i18next';

// TODO: El dia de mañana, cuando se logee un usuario que no es admin, guardar en el progresso, por qué dia de la marathon va.
// Mas que por que dia va, seria ver qué marathon esta haciendo, qué dia era el "startDate", y que dia es hoy
// Hay dos opciones, que la misma llamada de fetchMarathon, popule los dias que queremos mostrar. O que por cada dia se hace una llamada fetchDay

function Main() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { dayDetails } = useMarathon();
  const { userProgress, updateUserProgress } = useProgress();
  const [showRecipe, setShowRecipe] = useState();

  const [updateProgress] = useUpdateProgressMutation();

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
              <WorkoutCard data={eachWorkout} onClick={navigateToWorkouts} />
            </div>
          ))}
      </div>

      <Space medium />

      <Text isSubtitle>{t('todayDiet')}</Text>

      <Space small />

      <div className='marathon-config-scrollx'>
        {dayDetails?.meals.length > 0 &&
          dayDetails.meals
            .filter(ele => ele.diet === dietsEnum[0].value)
            .map((eachMeal, i) => (
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

      <div className='content-left-and-right'>
        <div className='content'>
          <Text isSubtitle>{t('todoList')}</Text>

          <Space small />

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
          <Text isSubtitle>{t('weight')}</Text>

          <Space small />

          <div className='container'>
            <div className='content-left-and-right'>
              <Text className='weigth-title'>XX kg > XX kg</Text>
              <Text className='weigth-title'>- XX kg</Text>
            </div>

            <Space small />

            <div>GRAFICOS</div>
          </div>
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
