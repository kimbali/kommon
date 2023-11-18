import React, { useEffect, useState } from 'react';
import MarathonSelector from '../components/marathon/MarathonSelector';
import Text from '../components/text/Text';
import Space from '../components/space/Space';
import PlanningSelector from '../components/marathon/PlanningSelector';
import MarathonDiets from '../components/marathon/MarathonDiets';
import {
  useGetPlanningDetailsQuery,
  useUpdatePlanningMutation,
} from '../slices/planningsApiSlice';
import { useCreateDayMutation } from '../slices/daysApiSlice';
import MarathonWorkouts from '../components/marathon/MarathonWorkouts';
import MarathonTasks from '../components/marathon/MarathonTasks';
import { useParams } from 'react-router-dom';

function Planning() {
  const { id } = useParams();
  const [currentMarathon, setCurrentMarathon] = useState();
  const [currentDiet, setCurrentDiet] = useState();
  const [currentDay, setCurrentDay] = useState();
  const [day, setDay] = useState();

  const { data: planData, refetch: refetchPlan } = useGetPlanningDetailsQuery(
    currentMarathon?.planning?._id
  );

  const [createDay] = useCreateDayMutation();
  const [updatePlanning] = useUpdatePlanningMutation();

  const handleNewDay = async () => {
    try {
      const newDay = await createDay(currentDay);

      if (newDay.data) {
        const updatedPlanning = {
          ...planData,
          month: [...planData.month, newDay.data._id],
        };

        await updatePlanning(updatedPlanning).unwrap();

        refetchPlan();
      } else {
        console.error('error');
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!planData && currentMarathon?.planning) {
      refetchPlan();
      return;
    }

    if (planData && currentDay) {
      const dayFound = planData?.month.find(
        ele =>
          ele.week === currentDay.week && ele.weekDay === currentDay.weekDay
      );

      if (dayFound) {
        setDay(dayFound);
      } else {
        handleNewDay();
      }
    }
  }, [currentDay, planData, currentDiet]);

  const onEditSection = async () => {
    await refetchPlan();
  };

  return (
    <div>
      <Text isTitle>Plannings configuration</Text>

      <Space medium />

      <MarathonSelector
        currentMarathonID={id}
        setMarathon={setCurrentMarathon}
        planName={planData?.name}
      />

      {currentMarathon && <Text line />}

      <Space small />

      {currentMarathon && (
        <PlanningSelector
          marathon={currentMarathon}
          setCurrentDiet={setCurrentDiet}
          setCurrentDay={setCurrentDay}
        />
      )}

      <Space big />

      {currentMarathon && currentDay && (
        <MarathonDiets
          mealsData={day?.meals}
          currentDiet={currentDiet}
          dayId={day?._id}
          onSave={onEditSection}
        />
      )}

      <Space big />

      {currentMarathon && currentDay && (
        <MarathonWorkouts
          workoutsData={day?.workouts}
          dayId={day?._id}
          onSave={onEditSection}
        />
      )}

      <Space big />

      {currentMarathon && currentDay && (
        <MarathonTasks
          tasksData={day?.tasks}
          dayId={day?._id}
          onSave={onEditSection}
        />
      )}

      <Space medium />
    </div>
  );
}

export default Planning;
