import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useGetDietsQuery } from '../../slices/dietsApiSlice';
import {
  formatDateShort,
  formatWeekDayShort,
  getDatePositionInMonthArray,
  howManyDaysBetween,
  isSameDay,
  weeksOptionsList,
} from '../../utils/formatDate';
import Button from '../button/Button';
import Input from '../input/Input';
import Space from '../space/Space';
import Text from '../text/Text';
import levelsEnum from '../../config/enums/levelsEnum';
import { useUser } from '../../context/userContext';
import { useTranslation } from 'react-i18next';
import Modal from '../modal/Modal';
import ShoppingList from '../recipes/ShoppingList';
import { useDate } from '../../context/dateContext';
import { useMarathon } from '../../context/marathonContext';
import frontRoutes from '../../config/frontRoutes';

function PlanningSelector({
  setCurrentDiet,
  setCurrentLevel,
  baseUrl,
  isFrontoffice,
  currentDiet,
}) {
  const { t } = useTranslation();
  const { user } = useUser();
  const { marathon } = useMarathon();
  const {
    currentDay,
    setCurrentDay,
    currentDate,
    setCurrentDate,
    currentWeek,
    setCurrentWeek,
    monthArray,
    setMonthArray,
  } = useDate();

  const { data: dietsData } = useGetDietsQuery({ keyword: 'YES' });

  const [weekOptions, setWeekOptions] = useState([]);
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

  const createWeeksOptions = todayPosition => {
    const { startDate, endDate } = marathon;
    const optionsWeeks = weeksOptionsList({
      startDate,
      endDate,
      isAdmin: user?.isAdmin,
      todayPosition,
      monthArray,
    });
    setWeekOptions(optionsWeeks);
    return optionsWeeks;
  };

  const handleSelectDay = date => {
    let week;
    let weekDay;

    if (date && monthArray) {
      const position = getDatePositionInMonthArray(monthArray, date);
      week = position.week;
      weekDay = position.weekDay;
    }

    if (
      !user.isAdmin &&
      !week &&
      !weekDay &&
      howManyDaysBetween(new Date(), monthArray[0][0]) <= 2
    ) {
      week = 1;
      weekDay = 0;
    }

    const day = {
      ...currentDay,
      week,
      weekDay,
    };

    setCurrentDate(date);
    setCurrentDay(day);

    let weeks = weekOptions;
    if (weekOptions.length === 0) {
      weeks = createWeeksOptions(day);
    }

    if (weeks) {
      setCurrentWeek(weeks?.find(ele => ele.value === week));
    }
  };

  useEffect(() => {
    if (marathon) {
      const dateToShow =
        (!user.isAdmin &&
          howManyDaysBetween(new Date(), monthArray[0][0]) <= 2) ||
        !currentDate
          ? marathon.startDate
          : currentDate;

      handleSelectDay(dateToShow);
    } else {
      setMonthArray();
      setWeekOptions([]);

      handleSelectDay();
    }
  }, [marathon, monthArray]);

  const handleWeekChange = ({ value, label }) => {
    setCurrentWeek({ label, value });

    handleSelectDay(monthArray[value - 1][0]);
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
          selectedOption={currentWeek || weekOptions[0]}
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

            {/* <Button className='shooping-list-cta' onClick={handleShoppingList}>
              {t('shoppingList')}
            </Button> */}

            <Link className='shooping-list-cta' to={frontRoutes.shoppingList}>
              {t('shoppingList')}
            </Link>
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
          currentWeek &&
          monthArray[currentWeek?.value - 1].map((day, index) => (
            <div className='day' key={`day-selector${index}`}>
              <Text className='date'>{formatDateShort(day)}</Text>

              <Button
                isPrimary={isSameDay(day, new Date(currentDate))}
                isThird={!isSameDay(day, new Date(currentDate))}
                onClick={() => handleSelectDay(day)}
              >
                {formatWeekDayShort(day)}
              </Button>
            </div>
          ))}
      </div>

      {showShoppingList && (
        <Modal isSecondary onClose={setShowShoppingList}>
          <ShoppingList />
        </Modal>
      )}
    </div>
  );
}

export default PlanningSelector;
