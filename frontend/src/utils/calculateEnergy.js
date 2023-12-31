import { BASE_KCAL } from '../config/constants';
import { getActivityNumeral } from '../config/enums/activitiesEnum';
import { getPorpuseNumeral } from '../config/enums/porpusesEnum';

const breastfeedNumeral = value => {
  return value === 'YES' ? 200 : 0;
};

export const calculateUserKcal = ({
  age,
  height,
  weight,
  activity,
  porpuse,
  breastfeed,
} = {}) => {
  if (!age || !height || !weight) {
    return 1700;
  }

  const totalKcalPerWeek =
    (655 + 9.6 * weight + 1.8 * height - 4.7 * age) *
      getActivityNumeral(activity) *
      getPorpuseNumeral(porpuse) -
    breastfeedNumeral(breastfeed);

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

// const _calculateUserKcal = ({
//   age,
//   height,
//   weight,
//   activity,
//   porpuse,
//   breastfeed,
// } = {}) => {
//   if (!age || !height || !weight) {
//     return 1700;
//   }

//   const totalKcalPerWeek =
//     (655 + 9.6 * weight + 1.8 * height - 4.7 * age) * activity * porpuse -
//     breastfeed;

//   return Math.round(totalKcalPerWeek / 50) * 50;
// };
// _calculateUserKcal({ age: 32, height: 180, weight: 57, activity: 1.55, porpuse: 0.8, breastfeed: 200})
