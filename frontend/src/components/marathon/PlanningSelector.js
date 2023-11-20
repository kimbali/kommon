import React, { useEffect, useRef, useState } from 'react';
import Input from '../input/Input';
import {
  calculateWeeks,
  formatDateShort,
  formatWeekDayShort,
  getDatePositionInMonthArray,
  getWeeksArray,
  formatDateHyphens,
} from '../../utils/formatDate';
import dietsEnum from '../../config/enums/dietsEnum';
import Space from '../space/Space';
import Button from '../button/Button';
import Text from '../text/Text';
import { useParams, useNavigate } from 'react-router-dom';
import frontRoutes from '../../config/frontRoutes';

function PlanningSelector({ marathon, setCurrentDiet, setCurrentDay }) {
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
        date: dateInAraay,
      } = getDatePositionInMonthArray(month, date);
      week = row;
      weekDay = column;
      dateFormatted = dateInAraay;
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
      navigate(`${frontRoutes.planning}/${marathonId}/${stringDate}`, {
        replace: true,
      });
    }
  };

  useEffect(() => {
    const { startDate, endDate } = marathon;
    const totalWeeks = calculateWeeks(startDate, endDate);

    const optionsWeeks = [...Array(totalWeeks).keys()].map((ele, index) => {
      return {
        label: `Week ${index + 1}`,
        value: index + 1,
      };
    });
    setWeekOptions(optionsWeeks);

    if (marathon && !dayParams) {
      navigate(
        `${frontRoutes.planning}/${marathonId}/${formatDateHyphens(startDate)}`,
        {
          replace: true,
        }
      );
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
    // setCurrentDay({
    //   week: value,
    //   weekDay: 1,
    // });
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

        <Input
          className='selector-fix-width'
          placeholder='Select diet'
          isSingleSelect
          options={dietsEnum}
          onChange={({ value }) => setCurrentDiet(value)}
          name='diet'
        />
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
