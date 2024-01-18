import { translate } from '../../traducciones/i18n';

const smokeEnum = [
  {
    label: translate('yes'),
    value: 'YES_SMOKE',
  },
  {
    label: translate('no'),
    value: 'NO',
  },
];

export const getSmokeLabel = value => {
  const smoke = smokeEnum.find(ele => ele.value === value);

  return smoke?.label || value;
};

export default smokeEnum;
