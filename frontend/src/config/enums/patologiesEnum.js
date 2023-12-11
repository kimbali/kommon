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
  const patologies = values.map(each =>
    patologyEnum.find(ele => ele.value === each)
  );

  return patologies.reduce((acc, ele) => `${acc} ${ele.label}`, '');
};

export default patologyEnum;
