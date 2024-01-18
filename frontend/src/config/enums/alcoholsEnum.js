import { translate } from '../../traducciones/i18n';

const alcoholEnum = [
  {
    label: translate('frecuentemente'),
    value: 'FREQUENT',
  },
  {
    label: translate('aVeces'),
    value: 'RARELY',
  },
  {
    label: translate('nunca'),
    value: 'NO',
  },
];

export const getAlcoholLabel = value => {
  const alcohol = alcoholEnum.find(ele => ele.value === value);

  return alcohol?.label || value;
};

export default alcoholEnum;
