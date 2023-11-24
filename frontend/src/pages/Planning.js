import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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

function Planning() {
  const navigate = useNavigate();
  const { marathonId: marathonIdParams } = useParams();
  const { marathonId, setMarathonId } = useMarathon();

  const [currentMarathon, setCurrentMarathon] = useState();
  const [currentDiet, setCurrentDiet] = useState();
  const [currentDay, setCurrentDay] = useState();
  const [day, setDay] = useState();

  const [createDay] = useCreateDayMutation();
  const [updatePlanning] = useUpdatePlanningMutation();
  const { data: planData, refetch: refetchPlan } = useGetPlanningDetailsQuery(
    currentMarathon?.planning?._id,
    { skip: !currentMarathon?.planning?._id }
  );

  useEffect(() => {
    if (!marathonIdParams && marathonId) {
      navigate(`${frontRoutes.planning}/${marathonId}`, {
        replace: true,
      });
    } else {
      setMarathonId(marathonIdParams);
    }
  }, [marathonIdParams]);

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
          baseUrl={frontRoutes.planning}
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
        <MarathonMeditations
          meditationData={day?.meditations}
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
