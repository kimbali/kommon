const activitiesEnum = [
  {
    label: 'Sin movimiento',
    sublabel: 'Muy poca actividad física (trabajo sentada, sin ejercicio)',
    value: 'SEDENTARY',
  },
  {
    label: 'Poca movilidad',
    sublabel: 'Actividad física reducida (1-3 entrenos a la semana)',
    value: 'LOW',
  },
  {
    label: 'Movilidad regular',
    sublabel:
      'Actividad física regular (3-5 entrenos a la semana, trabajo de pie)',
    value: 'MODERATE',
  },
  {
    label: 'Mucha movilidad',
    sublabel:
      'Actividad física constante (6-7 entrenos a la semana, trabajo de pie)',
    value: 'HIGH',
  },
];

export const getActivityLabel = value => {
  const activity = activitiesEnum.find(ele => ele.value === value);

  return activity?.label || value;
};

export default activitiesEnum;
