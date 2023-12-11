const porpusesEnum = [
  {
    label: 'Perder peso',
    value: 'LOSE_WEIGHT',
  },
  {
    label: 'Perder peso (pero estoy dando el pecho)',
    value: 'BREASTFEED',
  },
  {
    label: 'Tonificar',
    value: 'TONIFICAR',
  },
];

export const getPorpuseEnum = value => {
  const porpuse = porpusesEnum.find(ele => ele.value === value);

  return porpuse?.label || value;
};

export default porpusesEnum;
