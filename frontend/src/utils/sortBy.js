const sortBy = (
  list = [],
  property = '',
  sortOrder = 'asc',
  isDate = false
) => {
  if (!list) {
    return;
  }

  const [firstProperty, secondProperty] = property.split('.');

  const listSorted = list.slice().sort((a, b) => {
    const valueA = secondProperty
      ? a[firstProperty][secondProperty].toLowerCase()
      : a[firstProperty].toLowerCase();
    const valueB = secondProperty
      ? b[firstProperty][secondProperty].toLowerCase()
      : b[firstProperty].toLowerCase();

    if (sortOrder === 'asc') {
      return valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
    } else {
      return valueB < valueA ? -1 : valueB > valueA ? 1 : 0;
    }
  });

  return listSorted;
};

export default sortBy;
