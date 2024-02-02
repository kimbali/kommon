import React, { useEffect, useState } from 'react';
import Text from '../text/Text';
import Space from '../space/Space';
import ProgressColumn from './ProgressColumn';
import { useDate } from '../../context/dateContext';
import { weeksDatesList } from '../../utils/formatDate';
import { useProgress } from '../../context/progressContext';

function BodyParameter({ title, progress, measure }) {
  const { monthArray } = useDate();
  const { userProgress } = useProgress();

  const [weeksDates, setWeeksDates] = useState([]);

  useEffect(() => {
    if (monthArray) {
      const weekColumns = weeksDatesList(monthArray);
      setWeeksDates(weekColumns);
    }
  }, [monthArray, userProgress]);

  if (!progress) {
    return null;
  }

  return (
    <div className='body-parameter'>
      <Text isSubtitle>{title}</Text>

      <Space extraSmall />

      <div className='background-2 no-margin'>
        <div className='measures'>
          <Text fontSize='16'>
            {progress[0]} {measure} > {progress[progress.length - 1] || 0}{' '}
            {measure}
          </Text>

          <Text fontSize='16'>
            {progress[progress.length - 1] - progress[0]} {measure}
          </Text>
        </div>

        <Space medium />

        <div className='chart'>
          <div className='quantity'>
            <Text>100</Text>
            <Text>80</Text>
            <Text>60</Text>
            <Text>40</Text>
            <Text>20</Text>
          </div>

          <ProgressColumn total={progress[0]} date={weeksDates[0]} />

          <ProgressColumn total={progress[1]} date={weeksDates[1]} />

          <ProgressColumn total={progress[2]} date={weeksDates[2]} />

          <ProgressColumn total={progress[3]} date={weeksDates[3]} />

          <Space medium />
        </div>
      </div>
    </div>
  );
}

export default BodyParameter;
