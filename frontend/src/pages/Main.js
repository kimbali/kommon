import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetMarathonDetailsForClientQuery } from '../slices/marathonApiSlice';
import { useGetDayDetailsQuery } from '../slices/daysApiSlice';
import Text from '../components/text/Text';
import Space from '../components/space/Space';
import WorkoutCard from '../components/workouts/WorkoutCard';
import RecipeCard from '../components/recipes/RecipeCard';
import Input from '../components/input/Input';

// TODO: El dia de mañana, cuando se logee un usuario que no es admin, guardar en el progresso, por qué dia de la marathon va.
// Mas que por que dia va, seria ver qué marathon esta haciendo, qué dia era el "startDate", y que dia es hoy
// Hay dos opciones, que la misma llamada de fetchMarathon, popule los dias que queremos mostrar. O que por cada dia se hace una llamada fetchDay

function Main() {
  const { marathonId } = useParams();
  const [currentDay, setCurrentDay] = useState();

  const { data: marathonData, refetch: refetchMarathon } =
    useGetMarathonDetailsForClientQuery(marathonId);

  const { data: dayData, refetch: refetchDay } = useGetDayDetailsQuery(
    currentDay,
    { skip: !currentDay }
  );
  console.log(dayData);
  useEffect(() => {
    if (marathonData) {
      setCurrentDay(marathonData?.planning?.month[0]);
    }
  }, [marathonData]);

  const handleCheckTask = task => {
    console.log('check on user progress');
  };

  return (
    <div className='main-tab'>
      <Text isTitle>Your workouts for today</Text>

      <Space small />

      <div className='marathon-config-scrollx no-fix-content'>
        {dayData?.workouts.length > 0 &&
          dayData.workouts.map((eachWorkout, i) => (
            <div
              className={`single-workout ${i % 2 ? 'even' : 'pair'}`}
              key={`${i}-workout`}
            >
              <WorkoutCard data={eachWorkout} />
            </div>
          ))}
      </div>

      <Space medium />

      <Text isSubtitle>Your diet for today</Text>

      <Space small />

      <div className='marathon-config-scrollx'>
        {dayData?.meals.length > 0 &&
          dayData.meals.map((eachMeal, i) => (
            <div className='single-recipe' key={`${i}-recipe`}>
              <RecipeCard recipe={eachMeal.recipe} />
            </div>
          ))}

        <Space extraSmall />
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
              {dayData?.tasks.length > 0 &&
                dayData.tasks.map((eachTask, i) => (
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
    </div>
  );
}

export default Main;
