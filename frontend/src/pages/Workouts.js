import React, { useEffect, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import PlanningSelector from '../components/marathon/PlanningSelector';
import Space from '../components/space/Space';
import Text from '../components/text/Text';
import WorkoutCard from '../components/workouts/WorkoutCard';
import frontRoutes from '../config/frontRoutes';
import { useMarathon } from '../context/marathonContext';
import { useSelector } from 'react-redux';

function Workouts({ setCurrentDay }) {
  const [handleSelectDay, isError] = useOutletContext();
  const { userInfo } = useSelector(state => state.auth);

  const navigate = useNavigate();
  const { dayDetails, marathon } = useMarathon();
  const [workoutsList, setWorkoutsList] = useState([]);

  useEffect(() => {
    if (dayDetails) {
      setWorkoutsList(dayDetails.workouts);
    }
  }, [dayDetails]);

  const handleDayChange = day => {
    handleSelectDay(day);
  };

  const handleSelectLevel = level => {
    let list = dayDetails.workouts;

    if (level) {
      list = list.filter(ele => ele.level === level);
    }

    setWorkoutsList(list);
  };

  const navigateToWorkoutDetail = workout => {
    navigate(frontRoutes.workoutDetailsMain.replace(':id', workout._id));
  };

  if (!marathon) {
    return null;
  }

  return (
    <div>
      <Text isTitle>Your workouts for today</Text>

      <Space medium />

      <PlanningSelector
        marathon={marathon}
        setCurrentDay={handleDayChange}
        baseUrl={frontRoutes.workouts}
        isFrontoffice
        setCurrentLevel={handleSelectLevel}
      />

      <Space big />

      {isError && userInfo.isAdmin && (
        <div>You should configure this day on the backoffice</div>
      )}

      {!isError &&
        workoutsList.length > 0 &&
        workoutsList.map((eachWorkout, i) => (
          <div key={`workout-${i}`}>
            <WorkoutCard
              data={eachWorkout}
              onClick={() => navigateToWorkoutDetail(eachWorkout)}
            />

            <Space medium />
          </div>
        ))}
    </div>
  );
}

export default Workouts;
