import { translate } from '../../traducciones/i18n';

const measuresEnum = [
  { label: translate('grams'), diminutive: 'gr', value: 'GR' },
  { label: translate('mililiters'), diminutive: 'ml', value: 'ML' },
  { label: translate('units'), diminutive: 'units', value: 'UNIT' },
  { label: translate('spoon'), diminutive: 'spoon', value: 'SPOON' },
  { label: translate('alGusto'), diminutive: 'al gusto', value: 'AL_GUSTO' },
];

export const getMeasureLabel = value => {
  const measure = measuresEnum.find(eachMeasure => eachMeasure.value === value);

  return measure?.label || value;
};

export const getMeasureDiminutive = value => {
  const measure = measuresEnum.find(eachMeasure => eachMeasure.value === value);

  return measure?.diminutive || value;
};

export default measuresEnum;
