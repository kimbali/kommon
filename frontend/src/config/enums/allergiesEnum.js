const allergiesEnum = [
  { label: 'Apio', value: 'APIO' },
  { label: 'Crustáceos', value: 'CRUSTACEOS' },
  { label: 'Gluten', value: 'GLUTEN' },
  { label: 'Huevos', value: 'HUEVOS' },
  { label: 'Pescado', value: 'PESCADO' },
  { label: 'Altramuces', value: 'ALTRAMUCES' },
  { label: 'Leche', value: 'LECHE' },
  { label: 'Moluscos', value: 'MOLUSCOS' },
  { label: 'Mostaza', value: 'MOSTAZA' },
  { label: 'Frutos Secos', value: 'FRUTOS_SECOS' },
  { label: 'Cacahuetes', value: 'CACAHUETES' },
  { label: 'Semillas de Sésamo', value: 'SESAMO' },
  { label: 'Soja', value: 'SOJA' },
  { label: 'Sulfitos', value: 'SULFITOS' },
];

export const getAllergyLabel = allergy => {
  const allergyFound = allergiesEnum.find(ele => ele.value === allergy);
  if (allergyFound) {
    return allergyFound.label;
  }

  return allergy;
};

export const getAllergiesLabel = values => {
  if (!values) {
    return '';
  }

  const allergies = values.map(each =>
    allergiesEnum.find(ele => ele.value === each)
  );

  return allergies.reduce((acc, ele) => `${acc} ${ele.label} / `, '');
};

export default allergiesEnum;
