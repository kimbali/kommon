import { translate } from '../traducciones/i18n';

export const formatDate = date => {
  if (!date) return;

  const options = {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: '2-digit',
  };
  return new Date(date).toLocaleDateString('gb-GB', options); // mar, 13 nov 23
};

export const formatDateDayMonth = date => {
  if (!date) return;

  const options = {
    day: 'numeric',
    month: 'short',
  };
  return new Date(date).toLocaleDateString('gb-GB', options); // 13 nov
};

function isValidHyphenFormat(dateString) {
  const dateFormatRegex = /^(0?[1-9]|[12][0-9]|3[01])-(0?[1-9]|1[0-2])-\d{4}$/;
  return dateFormatRegex.test(dateString);
}

export const formatDateHyphens = date => {
  if (isValidHyphenFormat(date)) {
    return date;
  }

  const dateFormat = new Date(date);
  return dateFormat
    .toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
    .replace(/\//g, '-'); // 23-10-2023
};

export const formatDateShort = date => {
  if (!date) return;

  const day = String(date.getDate()).padStart(2, '0'); // Ensure two digits
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-based

  return `${day}.${month}`;
};

export const formatWeekDayShort = date => {
  if (!date) return;

  return date.toLocaleDateString('es', { weekday: 'short' }).slice(0, 3);
};

export function addOneMonth(startDate, weeksToAdd = 4) {
  const newDate = new Date(startDate);
  newDate.setDate(newDate.getDate() + (weeksToAdd * 7 - 1));

  return newDate;
}

export const calculateWeeks = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const daysDifference = Math.floor((end - start) / (1000 * 60 * 60 * 24));

  const fullWeeks = Math.floor(daysDifference / 7);
  const partialWeekAtStart = start.getDay();
  const partialWeekAtEnd = 6 - end.getDay();

  const totalWeeks =
    fullWeeks +
    (partialWeekAtStart !== 1 ? 1 : 0) +
    (partialWeekAtEnd !== 1 ? 1 : 0);

  return totalWeeks;
};

export const weeksOptionsList = ({
  startDate,
  endDate,
  isAdmin,
  todayPosition,
}) => {
  const totalWeeks = calculateWeeks(startDate, endDate);

  const optionsWeeks = [...Array(totalWeeks).keys()].map((ele, index) => {
    const isDisabled =
      !isAdmin &&
      !(todayPosition.weekDay >= 5 && todayPosition.week === index) &&
      todayPosition.week < index + 1;

    return {
      label: `${translate('week')} ${index + 1}`,
      value: index + 1,
      isDisabled,
    };
  });

  return optionsWeeks;
};

export function getWeeksArray(startDate, endDate) {
  const weeksArray = [];

  let currentDate = new Date(startDate);
  let week = [];

  while (currentDate <= new Date(endDate)) {
    week.push(new Date(currentDate));

    if (currentDate.getDay() === 0) {
      // Monday 0, end of the week
      weeksArray.push([...week]);
      week = [];
    }

    currentDate.setDate(currentDate.getDate() + 1);
  }

  // If there are remaining days
  if (week.length > 0) {
    weeksArray.push([...week]);
  }

  return weeksArray;
}

const areDatesEqual = (date1, date2) => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

export const getDatePositionInMonthArray = (monthArray, date) => {
  let targetDate = new Date(date);

  if (isValidHyphenFormat(date)) {
    const [day, month, year] = date.split('-').map(Number);
    targetDate = new Date(year, month - 1, day);
  }

  let position = { row: null, column: null };

  for (let i = 0; i < monthArray.length; i++) {
    const currentArray = monthArray[i];
    const columnIndex = currentArray.findIndex(ele =>
      areDatesEqual(ele, targetDate)
    );
    if (columnIndex !== -1) {
      position = {
        week: i + 1,
        weekDay: columnIndex,
        date: monthArray[i][columnIndex],
      };
      break;
    }
  }

  return position;
};

export const hasMarathonStarted = startDate => {
  const today = new Date();
  const twoDaysBeforeStart = new Date(startDate);
  twoDaysBeforeStart.setDate(twoDaysBeforeStart.getDate() - 2);

  return today.getTime() >= twoDaysBeforeStart.getTime();
};

export const hasMarathonFinished = endDate => {
  const today = new Date();

  return today.getTime() > new Date(endDate).getTime();
};

export const calculateDaysDifference = (startDate, endDate) => {
  const timeDifference =
    new Date(endDate).getTime() - new Date(startDate).getTime();

  return Math.ceil(timeDifference / (1000 * 3600 * 24));
};

export default formatDate;
