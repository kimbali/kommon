const problemsEnum = [
  {
    label: 'Comer compulsivamente',
    value: 'COMPULSIVELY_EATING',
  },
  {
    label: 'Anorexia',
    value: 'ANOREXY',
  },
  {
    label: 'Bulimia',
    value: 'BULIMIA',
  },
  {
    label: 'No',
    value: 'NO',
  },
];

export const getProblemsLabel = value => {
  const problem = problemsEnum.find(ele => ele.value === value);

  return problem?.label || value;
};

export default problemsEnum;
