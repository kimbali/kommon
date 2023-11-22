import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import dietsEnum from '../../config/enums/dietsEnum';
import {
  formatDateHyphens,
  formatDateShort,
  formatWeekDayShort,
  getDatePositionInMonthArray,
  getWeeksArray,
  weeksOptionsList,
} from '../../utils/formatDate';
import Button from '../button/Button';
import Input from '../input/Input';
import Space from '../space/Space';
import Text from '../text/Text';
import { DATE, MARATHON_ID } from '../../config/constants';
import levelsEnum from '../../config/enums/levelsEnum';

function PlanningSelector({
  marathon,
  setCurrentDiet,
  setCurrentLevel,
  setCurrentDay,
  baseUrl,
  isFrontoffice,
  defaultDiet,
}) {
  const { marathonId, day: dayParams } = useParams();
  const navigate = useNavigate();

  const [monthArray, setMonthArray] = useState();
  const [weekOptions, setWeekOptions] = useState([]);
  const [selectedWeek, setSelectedWeek] = useState();
  const [selectedDate, setSelectedDate] = useState();

  const handleSelectDay = (date, month, optionsWeeks) => {
    let week;
    let weekDay;
    let dateFormatted;

    if (month && date) {
      const {
        row,
        column,
        date: dateInArray,
      } = getDatePositionInMonthArray(month, date);
      week = row;
      weekDay = column;
      dateFormatted = dateInArray;
    }

    setSelectedDate(dateFormatted);
    setCurrentDay({
      week: week || 1,
      weekDay: weekDay,
    });

    if (optionsWeeks) {
      setSelectedWeek(optionsWeeks?.find(ele => ele.value === week));
    }

    const stringDate = formatDateHyphens(date);

    if (date && dayParams !== stringDate) {
      const url = isFrontoffice
        ? `${baseUrl}?${MARATHON_ID}=${marathon._id}&${DATE}=${stringDate}`
        : `${baseUrl}/${marathonId}/${stringDate}`;

      navigate(url, {
        replace: true,
      });
    }
  };

  useEffect(() => {
    const { startDate, endDate } = marathon;

    const optionsWeeks = weeksOptionsList(startDate, endDate);
    setWeekOptions(optionsWeeks);

    if (marathon && !dayParams) {
      const url = isFrontoffice
        ? `${baseUrl}?${MARATHON_ID}=${
            marathon._id
          }&${DATE}=${formatDateHyphens(startDate)}`
        : `${baseUrl}/${marathonId}/${formatDateHyphens(startDate)}`;

      navigate(url, {
        replace: true,
      });
    }

    if (marathon) {
      const month = getWeeksArray(startDate, endDate);
      setMonthArray(month);

      handleSelectDay(dayParams || month[0][0], month, optionsWeeks);
    } else {
      setMonthArray();
      setWeekOptions([]);

      handleSelectDay();
    }
  }, [marathon]);

  const handleWeekChange = ({ value, label }) => {
    setSelectedWeek({ label, value });

    handleSelectDay(monthArray[value - 1][0], monthArray);
  };

  return (
    <div className='planning-selector'>
      <div className='buttons-container'>
        <Input
          className='selector-fix-width'
          placeholder='Select week'
          isSingleSelect
          options={weekOptions}
          onChange={handleWeekChange}
          selectedOption={selectedWeek}
          name='week'
        />

        {setCurrentDiet && (
          <Input
            className='selector-fix-width'
            placeholder='Select diet'
            isSingleSelect
            options={dietsEnum}
            onChange={({ value }) => setCurrentDiet(value)}
            name='diet'
            defaultValue={dietsEnum.find(ele => ele.value === defaultDiet)}
          />
        )}

        {setCurrentLevel && (
          <Input
            className='selector-fix-width'
            placeholder='Select workout level'
            isSingleSelect
            options={[{ label: 'All levels', value: null }].concat(levelsEnum)}
            onChange={({ value }) => setCurrentLevel(value)}
            name='diet'
          />
        )}
      </div>

      <Space extraSmall />

      <div className='days-selector'>
        {monthArray &&
          selectedWeek &&
          monthArray[selectedWeek?.value - 1].map((day, index) => (
            <div className='day' key={`day-selector${index}`}>
              <Text className='date'>{formatDateShort(day)}</Text>

              <Button
                isPrimary={day.getTime() === selectedDate.getTime()}
                isThird={day.getTime() !== selectedDate.getTime()}
                onClick={() => handleSelectDay(day, monthArray)}
              >
                {formatWeekDayShort(day)}
              </Button>
            </div>
          ))}
      </div>
    </div>
  );
}

export default PlanningSelector;
