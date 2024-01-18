import { translate } from '../../traducciones/i18n';

const activitiesEnum = [
  {
    label: translate('sinMovilidad'),
    sublabel: translate('sinMovilidadSub'),
    value: 'SEDENTARY',
    numeral: 1.2,
  },
  {
    label: translate('pocaMovilidad'),
    sublabel: translate('pocaMovilidadSub'),
    value: 'LOW',
    numeral: 1.375,
  },
  {
    label: translate('movilidadRegular'),
    sublabel: translate('movilidadRegularSub'),
    value: 'MODERATE',
    numeral: 1.55,
  },
  {
    label: translate('muchaMovilidad'),
    sublabel: translate('muchaMovilidadSub'),
    value: 'HIGH',
    numeral: 1.72,
  },
];

export const getActivityLabel = value => {
  const activity = activitiesEnum.find(ele => ele.value === value);

  return activity?.label || value;
};

export const getActivityNumeral = value => {
  const activity = activitiesEnum.find(ele => ele.value === value);

  return activity?.numeral || value;
};

export default activitiesEnum;
