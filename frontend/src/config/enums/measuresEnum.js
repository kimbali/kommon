const measuresEnum = [
  { label: 'grams', diminutive: 'gr', value: 'GR' },
  { label: 'milliliters', diminutive: 'ml', value: 'ML' },
  { label: 'units', diminutive: 'units', value: 'UNIT' },
  { label: 'spoon', diminutive: 'spoon', value: 'SPOON' },
  { label: 'al gusto', diminutive: 'al gusto', value: 'AL_GUSTO' },
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
