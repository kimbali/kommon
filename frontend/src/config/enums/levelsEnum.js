import { translate } from '../../traducciones/i18n';

const levelsEnum = [
  { label: translate('beginner'), value: 'PRINCIPIANTE' },
  { label: translate('intermediate'), value: 'INTERMEDIO' },
  { label: translate('advanced'), value: 'AVANZADO' },
];

export const getLevelLabel = value => {
  const level = levelsEnum.find(eachMeasure => eachMeasure.value === value);

  return level?.label || value;
};

export default levelsEnum;
