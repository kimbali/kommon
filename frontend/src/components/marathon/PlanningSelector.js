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

function PlanningSelector({ marathon }) {
  const [monthArray, setMonthArray] = useState();
  const [weekOptions, setWeekOptions] = useState([]);
  const [selectedWeek, setSelectedWeek] = useState();
  const [selectedDiet, setSelectedDiet] = useState();
  const [selectedDay, setSelectedDay] = useState();

  useEffect(() => {
    if (marathon) {
      const { startDate, endDate } = marathon;

      const totalMarathonDays = calculateDays(startDate, endDate);
      const totalWeeks = Math.ceil(totalMarathonDays / 7);

      const optionsWeeks = [...Array(totalWeeks).keys()].map((ele, index) => {
        return {
          label: `Week ${index + 1}`,
          value: index,
        };
      });

      setWeekOptions(optionsWeeks);
      setSelectedWeek(optionsWeeks[0]);

      const month = getWeeksArray(startDate, endDate);
      setMonthArray(month);
      setSelectedDay(month[0][0]);
    } else {
      setMonthArray();
      setSelectedDay();
      setWeekOptions([]);
      setSelectedWeek();
    }
  }, [marathon]);

  const handleSelectDay = day => {
    setSelectedDay(day);
  };

  const handleWeekChanege = ({ value, label }) => {
    setSelectedWeek({ label, value });
  };

  return (
    <div className='planning-selector'>
      <div className='buttons-container'>
        <Input
          className='selector-fix-width'
          placeholder='Select week'
          isSingleSelect
          options={weekOptions}
          onChange={handleWeekChanege}
          selectedOption={selectedWeek}
          name='week'
        />

        <Input
          className='selector-fix-width'
          placeholder='Select diet'
          isSingleSelect
          options={dietsEnum}
          onChange={setSelectedDiet}
          name='diet'
        />
      </div>

      <Space medium />

      <div className='days-selector'>
        {monthArray &&
          selectedWeek &&
          monthArray[selectedWeek?.value].map((day, index) => (
            <div className='day' key={`day-selector${index}`}>
              <Text className='date'>{formatDateShort(day)}</Text>

              <Button
                isPrimary={day === selectedDay}
                isThird={day !== selectedDay}
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
