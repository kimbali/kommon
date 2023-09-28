import {
  faBowlFood,
  faCoffee,
  faCookie,
  faMugHot,
  faPlateWheat,
} from '@fortawesome/free-solid-svg-icons';

const categoriesEnum = [
  { label: 'breakfast', value: 'DESAYUNO', svg: faCoffee },
  { label: 'midmorning', value: 'MEDIA_MAÑANA', svg: faCookie },
  { label: 'lunch', value: 'COMIDA', svg: faPlateWheat },
  { label: 'snack', value: 'MERIENDA', svg: faMugHot },
  { label: 'dinner', value: 'CENA', svg: faBowlFood },
];

export const getCategorySVGAndLabel = value => {
  const category = categoriesEnum.find(each => each.value === value);

  return category ? { label: category?.label, svg: category.svg } : value;
};

export default categoriesEnum;
