const smokeEnum = [
  {
    label: 'Si',
    value: 'YES_SMOKE',
  },
  {
    label: 'No',
    value: 'NO',
  },
];

export const getSmokeLabel = value => {
  const smoke = smokeEnum.find(ele => ele.value === value);

  return smoke?.label || value;
};

export default smokeEnum;
