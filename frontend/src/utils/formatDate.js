import { translate } from '../traducciones/i18n';

export const diasSemana = [
  translate('sunday').substring(0, 3),
  translate('monday').substring(0, 3),
  translate('tuesday').substring(0, 3),
  translate('wednesday').substring(0, 3),
  translate('thursday').substring(0, 3),
  translate('friday').substring(0, 3),
  translate('saturday').substring(0, 3),
];

export const months = [
  translate('january'),
  translate('february'),
  translate('march'),
  translate('april'),
  translate('may'),
  translate('june'),
  translate('july'),
  translate('august'),
  translate('september'),
  translate('october'),
  translate('november'),
  translate('december'),
];

export const formatDate = date => {
  // mar, 13 nov 23
  if (!date) return;

  const options = {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: '2-digit',
  };
  return new Date(date).toLocaleDateString('gb-GB', options);
};

export const formatDateLong = date => {
  // domingo, 14 de abril
  if (!date) return;

  const options = {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  };
  return new Date(date).toLocaleDateString('gb-GB', options);
};

export const monthDayWeekFormat = date => {
  // Febrero 24, sáb

  const mes = months[date.getMonth()];
  const dia = date.getDate();
  const diaSemana = diasSemana[date.getDay()];

  return `${mes} ${dia}, ${diaSemana}`;
};

export const formatDateDayMonth = date => {
  // 13 nov
  if (!date) return;

  const options = {
    day: 'numeric',
    month: 'short',
  };
  return new Date(date).toLocaleDateString('gb-GB', options);
};

function isValidHyphenFormat(dateString) {
  const dateFormatRegex = /^(0?[1-9]|[12][0-9]|3[01])-(0?[1-9]|1[0-2])-\d{4}$/;
  return dateFormatRegex.test(dateString);
}

export const formatDateHyphens = date => {
  // 23-10-2023
  if (isValidHyphenFormat(date)) {
    return date;
  }

  const dateFormat = new Date(date);
  return dateFormat
    .toLocaleDateString('en-GB', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
    })
    .replace(/\//g, '-');
};

export const formatDateShort = date => {
  if (!date) return;

  const day = String(date.getDate()).padStart(2, '0'); // Ensure two digits
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-based

  return `${day}.${month}`;
};

export const formatWeekDayShort = date => {
  // Sab
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
  monthArray,
}) => {
  const totalWeeks = calculateWeeks(startDate, endDate);
  const weekLength = isAdmin ? 0 : monthArray[todayPosition.week - 1]?.length;

  const optionsWeeks = [...Array(totalWeeks).keys()].map((ele, index) => {
    const isDisabled =
      !isAdmin &&
      !(
        todayPosition?.weekDay >= weekLength - 2 &&
        todayPosition?.week === index
      ) &&
      todayPosition?.week < index + 1;

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

  let position = { week: null, weekDay: null, date: null };

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

export const createPorgressWeeksArray = (progress, monthArray) => {
  if (!progress) {
    return [];
  }

  const arr = progress.reduce(
    (acc, current) => {
      const accUpdated = acc;
      const position = getDatePositionInMonthArray(monthArray, current.date);

      if (position?.week) {
        accUpdated[0][position.week - 1].push(current);
      }

      return accUpdated;
    },
    [Array.from({ length: monthArray.length }, () => [])]
  );

  return arr[0];
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

export const isSameDay = (date1, date2) => {
  if (!date1 || !date2) {
    return false;
  }

  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

export const weeksDatesList = monthArray => {
  return monthArray.reduce((acc, ele) => {
    let accUpdated = acc;

    accUpdated.push({
      start: ele[0].getDate(),
      end: ele[ele.length - 1].getDate(),
    });

    return accUpdated;
  }, []);
};

export const generateCalendarData = (startDate, endDate) => {
  const calendarData = [];
  const currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();

    const monthData = Array.from({ length: 7 }, () => []);

    let currentDay = 1;
    let currentColumnIndex = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

    while (currentDay <= daysInMonth) {
      monthData[currentColumnIndex].push(new Date(year, month, currentDay));
      currentDay++;
      currentColumnIndex = (currentColumnIndex + 1) % 7;
    }

    // Fill in null values for empty columns at the beginning and end of the month
    while (currentColumnIndex !== 0) {
      monthData[currentColumnIndex].push(null);
      currentColumnIndex = (currentColumnIndex + 1) % 7;
    }

    calendarData.push(monthData);
    currentDate.setMonth(currentDate.getMonth() + 1);
  }

  return calendarData;
};

export const lessThan3DaysDifference = date => {
  if (!date) {
    return false;
  }

  const dateObj = new Date(date);
  const today = new Date();

  // Calcular la diferencia en milisegundos entre las dos fechas
  const difference = today.getTime() - dateObj.getTime();

  // Convertir la diferencia a días
  const differenceInDays = Math.ceil(difference / (1000 * 3600 * 24));

  // Comprobar si la diferencia está dentro de 3 días antes o después
  if (differenceInDays >= -3 && differenceInDays <= 3) {
    return true; // La fecha actual está dentro del rango de 3 días antes o después de date
  } else {
    return false; // La fecha actual está fuera del rango de 3 días antes o después de date
  }
};

export function howManyDaysBetween(date1, date2) {
  const millisecondsPerDay = 1000 * 60 * 60 * 24;
  const timeDiff = Math.abs(date2 - date1);
  const daysApart = Math.ceil(timeDiff / millisecondsPerDay);

  return daysApart;
}

export default formatDate;
