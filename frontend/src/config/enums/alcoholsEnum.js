const alcoholEnum = [
  {
    label: 'Frecuentemente',
    value: 'FREQUENT',
  },
  {
    label: 'A veces',
    value: 'RARELY',
  },
  {
    label: 'Nunca',
    value: 'NO',
  },
];

export const getAlcoholLabel = value => {
  const alcohol = alcoholEnum.find(ele => ele.value === value);

  return alcohol?.label || value;
};

export default alcoholEnum;
