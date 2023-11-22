import React from 'react';
import Text from '../text/Text';
import { getLevelLabel } from '../../config/enums/levelsEnum';
import PlayButton from './PlayButton';
import { useGetImageUrlQuery } from '../../slices/imagesApiSlice';

function WorkoutCard({ data, onClick }) {
  const { data: imageS3 } = useGetImageUrlQuery(
    {
      url: data?.image?.url,
    },
    { skip: !data?.image?.url }
  );

  return (
    <button onClick={onClick} className='workout-card-container'>
      <div
        className='workout-card'
        style={{ backgroundImage: `url(${imageS3?.signedUrl})` }}
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
