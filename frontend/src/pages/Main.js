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

// TODO: El dia de mañana, cuando se logee un usuario que no es admin, guardar en el progresso, por qué dia de la marathon va.
// Mas que por que dia va, seria ver qué marathon esta haciendo, qué dia era el "startDate", y que dia es hoy
// Hay dos opciones, que la misma llamada de fetchMarathon, popule los dias que queremos mostrar. O que por cada dia se hace una llamada fetchDay

function Main() {
  const navigate = useNavigate();
  const { dayDetails } = useMarathon();
  const [showRecipe, setShowRecipe] = useState();

  const handleCheckTask = task => {
    console.log('check on user progress');
  };

  const navigateToWorkouts = () => {
    navigate(frontRoutes.workouts);
  };

  const navigateToMeditations = () => {
    navigate(frontRoutes.meditations);
  };

  return (
    <div className='main-tab'>
      <Text isTitle>Your workouts for today</Text>

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

      <Text isSubtitle>Your diet for today</Text>

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

      <Text isTitle>Your meditations for today</Text>

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
          <Text isSubtitle>To do list</Text>

          <Space small />

          <div className='container'>
            <Text className='decolored-title'>Your tasks for today</Text>

            <Space small />

            <form>
              {dayDetails?.tasks.length > 0 &&
                dayDetails.tasks.map((eachTask, i) => (
                  <div className='single-task' key={`${i}-task`}>
                    <Input
                      type='checkbox'
                      className={eachTask.checked ? 'checked' : ''}
                      label={eachTask.title}
                      value={eachTask.checked}
                      onChange={() => handleCheckTask(eachTask)}
                    />
                  </div>
                ))}
            </form>
          </div>
        </div>

        <div className='content'>
          <Text isSubtitle>Weight</Text>

          <Space small />

          <div className='container'>
            <div className='content-left-and-right'>
              <Text className='weigth-title'>88.20 kg > 72.30 kg</Text>
              <Text className='weigth-title'>- 16.20 kg</Text>
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
