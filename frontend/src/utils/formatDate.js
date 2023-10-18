const formatDate = date => {
  if (!date) return;

  const options = {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    // year: '2-digit',
  };
  return new Date(date).toLocaleDateString('gb-GB', options);
};

export const formatDateShort = date => {
  if (!date) return;

  const day = String(date.getDate()).padStart(2, '0'); // Ensure two digits
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-based

  return `${day}.${month}`;
};

export const formatWeekDayShort = date => {
  if (!date) return;

  return date.toLocaleDateString('en', { weekday: 'short' }).slice(0, 3);
};

export function addOneMonth(startDate, weeksToAdd = 4) {
  const newDate = new Date(startDate);
  newDate.setDate(newDate.getDate() + (weeksToAdd * 7 - 1));

  return newDate;
}

export const calculateDays = (startDate, endDate) => {
  const start = new Date(startDate).getTime();
  const end = new Date(endDate).getTime();

  return Math.floor((end - start) / (1000 * 60 * 60 * 24)) + 1;
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

export default formatDate;
