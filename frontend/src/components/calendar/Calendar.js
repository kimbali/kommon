import React, { useState, useEffect } from 'react';
import Text from '../text/Text';
import {
  calculateDaysDifference,
  diasSemana,
  generateCalendarData,
  isSameDay,
  monthDayWeekFormat,
} from '../../utils/formatDate';
import Space from '../space/Space';
import { useGetMarathonsQuery } from '../../slices/marathonApiSlice';
import { useTranslation } from 'react-i18next';

const Calendar = () => {
  const { t } = useTranslation();
  const [calendarData, setCalendarData] = useState([]);
  const [untilNext, setUntilNext] = useState();
  const [todayISO] = useState(new Date().toISOString());

  const { data: marathonsData } = useGetMarathonsQuery({
    isActive: true,
    startDate: todayISO,
  });

  useEffect(() => {
    if (marathonsData?.marathons.length > 0) {
      const days = calculateDaysDifference(
        new Date(),
        marathonsData?.marathons[0].startDate
      );

      setUntilNext(days);
    }
  }, [marathonsData]);

  const dayClassname = date => {
    const startDate = marathonsData?.marathons.find(ele =>
      isSameDay(new Date(ele.startDate), date)
    );

    const endDate = marathonsData?.marathons.find(ele =>
      isSameDay(new Date(ele.endDate), date)
    );

    const inMarathon = marathonsData?.marathons.find(
      ele => new Date(ele.startDate) < date && new Date(ele.endDate) > date
    );

    const className = !!startDate
      ? 'start-date'
      : !!endDate
      ? 'end-date'
      : inMarathon
      ? 'middle'
      : '';

    return className;
  };

  useEffect(() => {
    let afterSixMonths = new Date();
    afterSixMonths.setMonth(afterSixMonths.getMonth() + 6);

    const data = generateCalendarData(new Date(), afterSixMonths);
    setCalendarData(data);
  }, []);

  return (
    <div className='calendar'>
      <div className='calendar-header'>
        <div className='content-left-and-right'>
          <Text isSectionTitle>{monthDayWeekFormat(new Date())}</Text>

          <Text>
            {t('untilNextMarathon')}
            <span className='primary'>
              {' '}
              {untilNext} {t('days')}
            </span>
          </Text>
        </div>

        <Space small />

        <div className='week-days'>
          {diasSemana.map(ele => (
            <Text key={ele} className='week-day'>
              {ele}
            </Text>
          ))}
        </div>
      </div>

      <div className='calendar-months'>
        {calendarData.map((monthData, index) => (
          <div key={`month${index}`}>
            <Text className='month-title'>
              {monthData[0][0].toLocaleString('default', {
                month: 'long',
              })}
            </Text>

            <Space extraSmall />

            <div className='calendar-month'>
              {monthData.map((dayColumn, columnIndex) => (
                <div key={`column${columnIndex}`} className='column'>
                  {dayColumn.map((day, dayIndex) => (
                    <div
                      key={`day${dayIndex}${columnIndex}`}
                      className={`day ${
                        isSameDay(new Date(), day) ? 'today' : ''
                      } ${dayClassname(day)}`}
                    >
                      <Text>{day?.getDate()}</Text>

                      {day && <div className='ball' />}
                    </div>
                  ))}

                  <Space medium />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
