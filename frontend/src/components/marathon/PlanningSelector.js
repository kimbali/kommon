import React, { useEffect, useState } from 'react';
import Input from '../input/Input';
import {
  calculateDays,
  formatDateShort,
  formatWeekDayShort,
  getWeeksArray,
} from '../../utils/formatDate';
import dietsEnum from '../../config/enums/dietsEnum';
import Space from '../space/Space';
import Button from '../button/Button';
import Text from '../text/Text';

function PlanningSelector({ marathon, setCurrentDiet, setCurrentDay }) {
  const [monthArray, setMonthArray] = useState();
  const [weekOptions, setWeekOptions] = useState([]);
  const [selectedWeek, setSelectedWeek] = useState();
  const [selectedDate, setSelectedDate] = useState();

  const handleSelectDay = date => {
    const dateStringToFind = date.toISOString();
    const weekDay =
      date &&
      monthArray &&
      selectedWeek?.value &&
      monthArray[selectedWeek?.value - 1].findIndex(
        date => date.toISOString() === dateStringToFind
      ) + 1;

    setSelectedDate(date);
    setCurrentDay({
      week: selectedWeek?.value || 1,
      weekDay: weekDay || 1,
    });
  };

  useEffect(() => {
    const { startDate, endDate } = marathon;

    const totalMarathonDays = calculateDays(startDate, endDate);
    const totalWeeks = Math.ceil(totalMarathonDays / 7);

    const optionsWeeks = [...Array(totalWeeks).keys()].map((ele, index) => {
      return {
        label: `Week ${index + 1}`,
        value: index + 1,
      };
    });

    setWeekOptions(optionsWeeks);
    setSelectedWeek(optionsWeeks[0]);

    if (marathon) {
      const month = getWeeksArray(startDate, endDate);
      setMonthArray(month);
      handleSelectDay(month[0][0]);
    } else {
      setMonthArray();
      setWeekOptions([]);
      handleSelectDay();
      // setSelectedWeek();
    }
  }, [marathon]);

  const handleWeekChange = ({ value, label }) => {
    setSelectedWeek({ label, value });
    setSelectedDate(monthArray[value - 1][0]);
    setCurrentDay({
      week: value,
      weekDay: 1,
    });
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
                isPrimary={day === selectedDate}
                isThird={day !== selectedDate}
                onClick={() => handleSelectDay(day)}
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
