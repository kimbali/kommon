import React from 'react';
import Text from '../text/Text';
import { getLevelLabel } from '../../config/enums/levelsEnum';
import PlayButton from './PlayButton';
import { useGetImageUrlQuery } from '../../slices/imagesApiSlice';
import { useTranslation } from 'react-i18next';
import { useConfig } from '../../context/configContext';

function WorkoutCard({ data, onClick, hideTitle }) {
  const { t } = useTranslation();
  const { config } = useConfig();

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
          {!hideTitle && <Text isTitle>{data.title}</Text>}

          {!hideTitle && (
            <Text className='description'>{data.description}</Text>
          )}

          <div className='content-left-and-right'>
            <Text className='minutes'>
              <span className='primary'>{data.minutes}</span> {t('min')}
            </Text>

            {config?.workoutsLevel && (
              <Text className='pill'>{getLevelLabel(data.level)}</Text>
            )}
          </div>
        </div>

        <PlayButton />
      </div>
    </button>
  );
}

export default WorkoutCard;
