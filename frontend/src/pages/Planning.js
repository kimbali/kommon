import React, { useEffect, useState } from 'react';
import MarathonDiets from '../components/marathon/MarathonDiets';
import MarathonSelector from '../components/marathon/MarathonSelector';
import MarathonTasks from '../components/marathon/MarathonTasks';
import MarathonWorkouts from '../components/marathon/MarathonWorkouts';
import PlanningSelector from '../components/marathon/PlanningSelector';
import Space from '../components/space/Space';
import Text from '../components/text/Text';
import frontRoutes from '../config/frontRoutes';
import { useMarathon } from '../context/marathonContext';
import { useCreateDayMutation } from '../slices/daysApiSlice';
import {
  useGetPlanningDetailsQuery,
  useUpdatePlanningMutation,
} from '../slices/planningsApiSlice';
import MarathonMeditations from '../components/marathon/MarathonMeditations';
import { useTranslation } from 'react-i18next';
import { useDate } from '../context/dateContext';

function Planning() {
  const { t } = useTranslation();
  const { marathon } = useMarathon();
  const { currentDay } = useDate();

  const [currentDiet, setCurrentDiet] = useState();
  const [day, setDay] = useState();

  const [createDay] = useCreateDayMutation();
  const [updatePlanning] = useUpdatePlanningMutation();
  const { data: planData, refetch: refetchPlan } = useGetPlanningDetailsQuery(
    marathon?.planning?._id,
    { skip: !marathon?.planning?._id }
  );

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
    if (!planData && marathon?.planning) {
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
      <Text isTitle>{t('planning')}</Text>

      <Space medium />

      <MarathonSelector planName={planData?.name} />

      {marathon && <Text line />}

      <Space small />

      {marathon && (
        <PlanningSelector
          setCurrentDiet={setCurrentDiet}
          baseUrl={frontRoutes.planning}
        />
      )}

      <Space big />

      {marathon && currentDay && (
        <MarathonDiets
          mealsData={day?.meals}
          currentDiet={currentDiet}
          dayId={day?._id}
          onSave={onEditSection}
        />
      )}

      <Space big />

      {marathon && currentDay && (
        <MarathonWorkouts
          workoutsData={day?.workouts}
          dayId={day?._id}
          onSave={onEditSection}
        />
      )}

      <Space big />

      {marathon && currentDay && (
        <MarathonMeditations
          meditationData={day?.meditations}
          dayId={day?._id}
          onSave={onEditSection}
        />
      )}

      <Space big />

      {marathon && currentDay && (
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
