const activitiesEnum = [
  {
    label: 'Sin movimiento',
    sublabel: 'Muy poca actividad física (trabajo sentada, sin ejercicio)',
    value: 'SEDENTARY',
    numeral: 1.2,
  },
  {
    label: 'Poca movilidad',
    sublabel: 'Actividad física reducida (1-3 entrenos a la semana)',
    value: 'LOW',
    numeral: 1.375,
  },
  {
    label: 'Movilidad regular',
    sublabel:
      'Actividad física regular (3-5 entrenos a la semana, trabajo de pie)',
    value: 'MODERATE',
    numeral: 1.55,
  },
  {
    label: 'Mucha movilidad',
    sublabel:
      'Actividad física constante (6-7 entrenos a la semana, trabajo de pie)',
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
