import { getActivityNumeral } from '../config/enums/activitiesEnum';
import { getPorpuseNumeral } from '../config/enums/porpusesEnum';

export const calculateUserKcal = ({
  age,
  height,
  weight,
  activity,
  porpuse,
} = {}) => {
  if (!age || !height || !weight) {
    return 1700;
  }

  const totalKcalPerWeek =
    655 +
    9.6 * weight +
    1.8 * height -
    4.7 * age * getActivityNumeral(activity) * getPorpuseNumeral(porpuse);

  return Math.round(totalKcalPerWeek / 50) * 50;
};

const calculateEnergy = (type = '', ingredients = []) => {
  const total = ingredients.reduce((acc, ele) => {
    if (!ele?.ingredient) {
      return acc;
    }

    return acc + ele.ingredient[type] * (ele.quantity || 0);
  }, 0);

  return total.toLocaleString('de-DE');
};

export default calculateEnergy;
