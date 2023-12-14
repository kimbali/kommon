const porpusesEnum = [
  {
    label: 'Perder peso',
    value: 'LOSE_WEIGHT',
    numeral: 0.8,
  },
  {
    label: 'Tonificar',
    value: 'TONIFICAR',
    numeral: 1,
  },
];

export const getPorpuseLabel = value => {
  const porpuse = porpusesEnum.find(ele => ele.value === value);

  return porpuse?.label || value;
};

export const getPorpuseNumeral = value => {
  const porpuse = porpusesEnum.find(ele => ele.value === value);

  return porpuse?.numeral || value;
};

export default porpusesEnum;
