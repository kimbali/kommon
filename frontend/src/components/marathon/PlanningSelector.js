import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useGetDietsQuery } from '../../slices/dietsApiSlice';
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
import { useUser } from '../../context/userContext';
import { useTranslation } from 'react-i18next';
import Modal from '../modal/Modal';
import ShoppingList from '../recipes/ShoppingList';

function PlanningSelector({
  marathon,
  setCurrentDiet,
  setCurrentLevel,
  setCurrentDay,
  baseUrl,
  isFrontoffice,
  currentDiet,
}) {
  const { t } = useTranslation();
  const { marathonId } = useParams();
  const [searchParams] = useSearchParams();
  const dateParam = searchParams.get('date');

  const { user } = useUser();
  const navigate = useNavigate();
  const { data: dietsData } = useGetDietsQuery({ keyword: 'YES' });

  const [monthArray, setMonthArray] = useState();
  const [weekOptions, setWeekOptions] = useState([]);
  const [selectedWeek, setSelectedWeek] = useState();
  const [selectedDate, setSelectedDate] = useState();
  const [showShoppingList, setShowShoppingList] = useState(false);
  const [dietsList, setDietsList] = useState([]);

  useEffect(() => {
    if (dietsData) {
      const options = dietsData.diets.map(ele => {
        return { value: ele, label: ele.name };
      });

      setDietsList(options);
    }
  }, [dietsData]);

  const handleShoppingList = () => {
    setShowShoppingList(true);
  };

  const handleSelectDay = (date, month, optionsWeeks) => {
    let week;
    let weekDay;
    let dateFormatted;

    if (month && date) {
      const position = getDatePositionInMonthArray(month, date);
      week = position.week;
      weekDay = position.weekDay;
      dateFormatted = position.date;
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

    if (date && dateParam !== stringDate) {
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

    if (marathon && !dateParam) {
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

      const todayPosition = getDatePositionInMonthArray(month, new Date());
      const optionsWeeks = weeksOptionsList({
        startDate,
        endDate,
        isAdmin: user?.isAdmin,
        todayPosition,
      });
      setWeekOptions(optionsWeeks);

      handleSelectDay(dateParam || month[0][0], month, optionsWeeks);
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
          placeholder={t('selectWeek')}
          isSingleSelect
          options={weekOptions}
          onChange={handleWeekChange}
          selectedOption={selectedWeek}
          name='week'
        />

        {setCurrentDiet && (
          <div className='buttons-container'>
            <Input
              className='selector-fix-width'
              placeholder={t('selectDiet')}
              isSingleSelect
              options={dietsList}
              onChange={({ value }) => setCurrentDiet(value._id)}
              name='diet'
              selectedOption={dietsList.find(
                ele => ele.value._id === currentDiet
              )}
            />

            <Button className='shooping-list-cta' onClick={handleShoppingList}>
              {t('shoppingList')}
            </Button>
          </div>
        )}

        {setCurrentLevel && (
          <Input
            className='selector-fix-width'
            placeholder={t('selectWorkoutLevel')}
            isSingleSelect
            options={[{ label: t('allLevels'), value: null }].concat(
              levelsEnum
            )}
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

      {showShoppingList && (
        <Modal onClose={setShowShoppingList}>
          <ShoppingList />
        </Modal>
      )}
    </div>
  );
}

export default PlanningSelector;
