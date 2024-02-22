import { translate } from '../../traducciones/i18n';

const patologyEnum = [
  {
    label: translate('negativo'),
    value: 'NO',
  },
  {
    label: translate('diabetes'),
    value: 'DIABETES',
  },
  {
    label: translate('cancer'),
    value: 'CANCER',
  },
];

export const getPatologiesLabel = values => {
  if (!values) {
    return '';
  }

  const patologies = values.map(each =>
    patologyEnum.find(ele => ele.value === each)
  );

  return patologies.reduce((acc, ele) => `${acc} ${ele.label} /`, '');
};

export default patologyEnum;
