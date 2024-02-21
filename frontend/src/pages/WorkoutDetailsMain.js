import React, { useEffect, useState } from 'react';
import Text from '../components/text/Text';
import { getLevelLabel } from '../config/enums/levelsEnum';
import Space from '../components/space/Space';
import VideoPlayer from '../components/video/VideoPlayer';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useParams } from 'react-router-dom';
import { useMarathon } from '../context/marathonContext';
import { useTranslation } from 'react-i18next';
import { useConfig } from '../context/configContext';

function WorkoutDetailsMain() {
  const { t } = useTranslation();
  const { id } = useParams();
  const { dayDetails } = useMarathon();
  const { config } = useConfig();

  const [workout, setWorkout] = useState();

  useEffect(() => {
    if (dayDetails && id) {
      const workoutDetails = dayDetails.workouts.find(ele => ele._id === id);
      setWorkout(workoutDetails);
    }
  }, []);

  if (!workout) {
    return null;
  }
  return (
    <div className='workout-details'>
      <Space medium />

      <VideoPlayer url={workout.video} />

      <Space small />

      <div className='content-on-the-left'>
        {workout.minutes && (
          <Text className='minutes'>
            <span className='primary'>{workout.minutes}</span> {t('min')}
          </Text>
        )}

        {config.workoutsLevel && (
          <Text className='pill'>{getLevelLabel(workout.level)}</Text>
        )}
      </div>

      <Space small />

      <Markdown className='description' remarkPlugins={[remarkGfm]}>
        {workout.description}
      </Markdown>
    </div>
  );
}

export default WorkoutDetailsMain;
