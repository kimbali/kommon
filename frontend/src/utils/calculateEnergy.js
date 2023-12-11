import { BASE_KCAL } from '../config/constants';
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

export const KcalReglaDeTres = (total, user) => {
  const computation = (total * calculateUserKcal(user)) / BASE_KCAL;

  return computation.toLocaleString('de-DE', { maximumFractionDigits: 0 });
};

const calculateEnergy = (type = '', ingredients = [], user) => {
  let total = ingredients.reduce((acc, ele) => {
    if (!ele?.ingredient) {
      return acc;
    }

    return acc + ele.ingredient[type] * (ele.quantity || 0);
  }, 0);

  total = KcalReglaDeTres(total, user);

  return total.toLocaleString('de-DE', { maximumFractionDigits: 0 });
};

export default calculateEnergy;
