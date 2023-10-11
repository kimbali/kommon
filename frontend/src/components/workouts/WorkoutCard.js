import React from 'react';
import Text from '../text/Text';
import DEFAULT_IMG from '../../styles/assets/workout-01.png';
import { getLevelLabel } from '../../config/enums/levelsEnum';
import PlayButton from './PlayButton';

function WorkoutCard({ data, onClick }) {
  return (
    <button onClick={onClick} className='workout-card-container'>
      <div
        className='workout-card'
        style={{ backgroundImage: `url(${data.image || DEFAULT_IMG})` }}
      >
        <div className='workout-card-content'>
          <Text isTitle>{data.title}</Text>

          <Text className='description'>{data.description}</Text>

          <div className='content-left-and-right'>
            <Text className='minutes'>
              <span className='primary'>{data.minutes}</span> min
            </Text>

            <div className='pill'>{getLevelLabel(data.level)}</div>
          </div>
        </div>

        <PlayButton />
      </div>
    </button>
  );
}

export default WorkoutCard;
