import { translate } from '../../traducciones/i18n';

const porpusesEnum = [
  {
    label: translate('looseWeight'),
    value: 'LOSE_WEIGHT',
    numeral: 0.8,
  },
  {
    label: translate('tonificar'),
    value: 'TONIFICAR',
    numeral: 0.9,
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
