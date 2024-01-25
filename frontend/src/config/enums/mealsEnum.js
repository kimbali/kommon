import {
  faBowlFood,
  faCoffee,
  faCookie,
  faMugHot,
  faPlateWheat,
} from '@fortawesome/free-solid-svg-icons';
import { translate } from '../../traducciones/i18n';

const mealsEnum = [
  { label: translate('breakfast'), value: 'DESAYUNO', svg: faCoffee },
  { label: translate('midmorning'), value: 'MEDIA_MAÑANA', svg: faCookie },
  { label: translate('lunch'), value: 'COMIDA', svg: faPlateWheat },
  { label: translate('snack'), value: 'MERIENDA', svg: faMugHot },
  { label: translate('dinner'), value: 'CENA', svg: faBowlFood },
];

export const getmealSVGAndLabel = value => {
  const meal = mealsEnum.find(each => each.value === value);

  return meal ? { label: meal?.label, svg: meal.svg } : value;
};

export default mealsEnum;
