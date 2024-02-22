import React, { useEffect, useState } from 'react';
import Text from '../text/Text';
import Space from '../space/Space';
import ProgressColumn from './ProgressColumn';
import { useDate } from '../../context/dateContext';
import { createPorgressWeeksArray } from '../../utils/formatDate';
import { useProgress } from '../../context/progressContext';

function BodyParameter({ title, progress, measure }) {
  const { monthArray } = useDate();
  const { userProgress } = useProgress();

  const [weeksDates, setWeeksDates] = useState([]);

  useEffect(() => {
    if (monthArray) {
      const weekColumns = createPorgressWeeksArray(progress, monthArray);

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
            {progress[0].value} {measure} >{' '}
            {progress[progress.length - 1].value || 0} {measure}
          </Text>

          <Text fontSize='16'>
            {progress[progress.length - 1].value - progress[0].value} {measure}
          </Text>
        </div>

        <Space medium />

        <div className='chart'>
          <div className='quantity'>
            <Text>120 {measure}</Text>
            <Text>100 {measure}</Text>
            <Text>80 {measure}</Text>
            <Text>60 {measure}</Text>
            <Text>40 {measure}</Text>
            <Text>Semana</Text>
          </div>

          {weeksDates?.map((ele, index) => {
            const lastWeekDayValue = ele[weeksDates[index].length - 1];

            return (
              <ProgressColumn
                key={`week-${index}`}
                total={(100 * +lastWeekDayValue?.value) / 120}
                text={index + 1}
              />
            );
          })}

          <Space medium />
        </div>
      </div>
    </div>
  );
}

export default BodyParameter;
