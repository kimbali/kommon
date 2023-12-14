const yesNoEnum = [
  {
    label: 'Si',
    value: 'YES',
  },
  {
    label: 'No',
    value: 'NO',
  },
];

export const getYesNoLabel = value => {
  const yesNo = yesNoEnum.find(ele => ele.value === value);

  return yesNo?.label || value;
};

export default yesNoEnum;
