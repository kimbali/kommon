const dietsEnum = [
  { label: 'Diet 1', value: 'DIET1' },
  { label: 'Diet 2', value: 'DIET2' },
  { label: 'Diet 3', value: 'DIET3' },
  { label: 'Diet 4', value: 'DIET4' },
  { label: 'Diet 5', value: 'DIET5' },
  { label: 'Diet 6', value: 'DIET6' },
  { label: 'Diet 7', value: 'DIET7' },
];

export const getDietEnumLabel = value => {
  const element = dietsEnum.find(each => each.value === value);

  return element ? { label: element?.label, svg: element.svg } : value;
};

export default dietsEnum;
