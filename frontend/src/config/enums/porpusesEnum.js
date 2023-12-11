const porpusesEnum = [
  {
    label: 'Perder peso',
    value: 'LOSE_WEIGHT',
    numeral: 0.8,
  },
  {
    label: 'Perder peso (pero estoy dando el pecho)',
    value: 'BREASTFEED',
    numeral: 1,
  },
  {
    label: 'Tonificar',
    value: 'TONIFICAR',
    numeral: 1,
  },
];

export const getPorpuseEnum = value => {
  const porpuse = porpusesEnum.find(ele => ele.value === value);

  return porpuse?.label || value;
};

export const getPorpuseNumeral = value => {
  const porpuse = porpusesEnum.find(ele => ele.value === value);

  return porpuse?.numeral || value;
};

export default porpusesEnum;
