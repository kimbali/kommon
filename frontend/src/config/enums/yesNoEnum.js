import { translate } from '../../traducciones/i18n';

const yesNoEnum = [
  {
    label: translate('yes'),
    value: 'YES',
  },
  {
    label: translate('no'),
    value: 'NO',
  },
];

export const getYesNoLabel = value => {
  const yesNo = yesNoEnum.find(ele => ele.value === value);

  return yesNo?.label || value;
};

export default yesNoEnum;
