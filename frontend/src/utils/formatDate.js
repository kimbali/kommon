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

export function addOneMonth(startDate, weeksToAdd = 4) {
  const newDate = new Date(startDate);
  newDate.setDate(newDate.getDate() + (weeksToAdd * 7 - 1));

  return newDate;
}

export default formatDate;
