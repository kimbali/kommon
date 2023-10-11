const levelsEnum = [
  { label: 'Beginner', value: 'PRINCIPIANTE' },
  { label: 'Intermediate', value: 'INTERMEDIO' },
  { label: 'Advanced', value: 'AVANZADO' },
];

export const getLevelLabel = value => {
  const level = levelsEnum.find(eachMeasure => eachMeasure.value === value);

  return level?.label || value;
};

export default levelsEnum;
