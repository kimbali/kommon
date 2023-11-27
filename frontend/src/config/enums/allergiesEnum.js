const allergiesEnum = [
  { label: 'Celery', value: 'APIO' },
  { label: 'Crustaceans', value: 'CRUSTACEOS' },
  { label: 'Gluten', value: 'GLUTEN' },
  { label: 'Eggs', value: 'HUEVOS' },
  { label: 'Fish', value: 'PESCADO' },
  { label: 'Lupin', value: 'ALTRAMUCES' },
  { label: 'Milk', value: 'LECHE' },
  { label: 'Molluscs', value: 'MOLUSCOS' },
  { label: 'Mustard', value: 'MOSTAZA' },
  { label: 'Nuts', value: 'FRUTOS_SECOS' },
  { label: 'Peanuts', value: 'CACAHUETES' },
  { label: 'Sesame seeds', value: 'SESAMO' },
  { label: 'Soya', value: 'SOJA' },
  { label: 'Sulphites', value: 'SULFITOS' },
];

export const getAllergyLabel = allergy => {
  const allergyFound = allergiesEnum.find(ele => ele.value === allergy);
  if (allergyFound) {
    return allergyFound.label;
  }

  return allergy;
};

export default allergiesEnum;
