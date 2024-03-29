import { translate } from '../../traducciones/i18n';

const allergiesEnum = [
  { label: translate('negativo'), value: 'NO' },
  { label: translate('gluten'), value: 'GLUTEN' },
  { label: translate('crustaceos'), value: 'CRUSTACEOS' },
  { label: translate('moluscos'), value: 'MOLUSCOS' },
  { label: translate('pescado'), value: 'PESCADO' },
  { label: translate('huevos'), value: 'HUEVOS' },
  { label: translate('altramuces'), value: 'ALTRAMUCES' },
  { label: translate('mostaza'), value: 'MOSTAZA' },
  { label: translate('cacahuetes'), value: 'CACAHUETES' },
  { label: translate('frutosSecos'), value: 'FRUTOS_SECOS' },
  { label: translate('soja'), value: 'SOJA' },
  { label: translate('semillasDeSesamo'), value: 'SESAMO' },
  { label: translate('apio'), value: 'APIO' },
  { label: translate('leche'), value: 'LECHE' },
  { label: translate('sulfitos'), value: 'SULFITOS' },
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

  return allergies.reduce((acc, ele) => {
    if (ele.value === 'NO') {
      return '';
    }

    return `${acc} ${ele.label} `;
  }, '');
};

export default allergiesEnum;
