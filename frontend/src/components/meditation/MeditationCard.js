import React from 'react';
import Text from '../text/Text';
import { useGetImageUrlQuery } from '../../slices/imagesApiSlice';
import PlayButton from '../workouts/PlayButton';
import { useTranslation } from 'react-i18next';

function MeditationCard({ data, onClick }) {
  const { t } = useTranslation();

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

          <Text className='minutes'>
            <span className='primary'>{data.minutes}</span> {t('min')}
          </Text>
        </div>

        <PlayButton />
      </div>
    </button>
  );
}

export default MeditationCard;
