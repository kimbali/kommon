import { translate } from '../../traducciones/i18n';

const problemsEnum = [
  {
    label: translate('compulsivo'),
    value: 'COMPULSIVELY_EATING',
  },
  {
    label: translate('anorexia'),
    value: 'ANOREXY',
  },
  {
    label: translate('bulimia'),
    value: 'BULIMIA',
  },
  {
    label: translate('no'),
    value: 'NO',
  },
];

export const getProblemsLabel = value => {
  const problem = problemsEnum.find(ele => ele.value === value);

  return problem?.label || value;
};

export default problemsEnum;
