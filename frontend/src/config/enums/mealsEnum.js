import {
  faBowlFood,
  faCoffee,
  faCookie,
  faMugHot,
  faPlateWheat,
} from '@fortawesome/free-solid-svg-icons';

const mealsEnum = [
  { label: 'Breakfast', value: 'DESAYUNO', svg: faCoffee },
  { label: 'Midmorning', value: 'MEDIA_MAÑANA', svg: faCookie },
  { label: 'Lunch', value: 'COMIDA', svg: faPlateWheat },
  { label: 'Snack', value: 'MERIENDA', svg: faMugHot },
  { label: 'Dinner', value: 'CENA', svg: faBowlFood },
];

export const getmealSVGAndLabel = value => {
  const meal = mealsEnum.find(each => each.value === value);

  return meal ? { label: meal?.label, svg: meal.svg } : value;
};

export default mealsEnum;
