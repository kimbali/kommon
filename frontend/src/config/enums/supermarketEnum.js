import { translate } from '../../traducciones/i18n';

const supermarketEnum = [
  { label: translate('fruit'), value: 'FRUIT' },
  { label: translate('vegetables'), value: 'VEGETABLES' },
  { label: translate('meat'), value: 'MEAT' },
  { label: translate('fish'), value: 'FISH' },
  { label: translate('dairyEgss'), value: 'DAIRY_EGGS' },
  { label: translate('pantry'), value: 'PANTRY' },
  { label: translate('breakfastSweets'), value: 'BREAKFAST_SWEETS' },
  { label: translate('bakery'), value: 'BAKERY' },
  { label: translate('frozen'), value: 'FROZEN' },
  { label: translate('species'), value: 'SPECIES' },
];

export const getSupermarketLabel = value => {
  const element = supermarketEnum.find(each => each.value === value);

  return element ? element?.label : value;
};

export default supermarketEnum;
