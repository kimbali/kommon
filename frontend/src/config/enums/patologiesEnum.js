const patologyEnum = [
  {
    label: 'Diabetes',
    value: 'DIABETES',
  },
  {
    label: 'Cancer',
    value: 'CANCER',
  },
];

export const getPatologiesLabel = values => {
  const alcohol = values.map(each =>
    patologyEnum.find(ele => ele.value === each)
  );

  return alcohol.reduce((acc, ele) => `${acc} ${ele.label}`, '');
};

export default patologyEnum;
