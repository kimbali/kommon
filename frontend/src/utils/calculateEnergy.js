import { BASE_KCAL } from '../config/constants';
import { getActivityNumeral } from '../config/enums/activitiesEnum';
import { getPorpuseNumeral } from '../config/enums/porpusesEnum';

const breastfeedNumeral = value => {
  return value === 'YES' ? 200 : 0;
};

export const caloriesCalculatorFormula = ({
  age,
  height,
  weight,
  activity,
  porpuse,
  breastfeed,
  isAdmin,
} = {}) => {
  if (!age || !height || !weight) {
    return 0;
  }

  const totalKcalPerWeek =
    (655 + 9.6 * +weight + 1.8 * +height - 4.7 * +age) *
      getActivityNumeral(activity) *
      getPorpuseNumeral(porpuse) -
    breastfeedNumeral(breastfeed);

  return Math.round(totalKcalPerWeek / 50) * 50;
};

export const calculateUserKcal = ({
  age,
  height,
  weight,
  activity,
  porpuse,
  breastfeed,
  isAdmin,
} = {}) => {
  if (!age || !height || !weight || isAdmin) {
    return BASE_KCAL;
  }

  const totalKcalPerWeek =
    (655 + 9.6 * +weight + 1.8 * +height - 4.7 * +age) *
      getActivityNumeral(activity) *
      getPorpuseNumeral(porpuse) -
    breastfeedNumeral(breastfeed);

  return Math.round(totalKcalPerWeek / 50) * 50;
};

export const KcalReglaDeTres = (total, user, { returnNumber } = {}) => {
  const computation = (total * calculateUserKcal(user)) / BASE_KCAL;

  if (returnNumber) {
    return computation;
  }

  return computation.toLocaleString('de-DE', { maximumFractionDigits: 2 });
};

const calculateEnergy = (type = '', ingredients = [], user) => {
  let total = ingredients.reduce((acc, ele) => {
    if (!ele?.ingredient) {
      return acc;
    }

    return acc + ele.ingredient[type] * (ele.quantity || 0);
  }, 0);

  total = KcalReglaDeTres(total, user, { returnNumber: true }) / 100;

  return total.toLocaleString('de-DE', { maximumFractionDigits: 2 });
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

export const createUniqueIngredientsList = ingredients => {
  return ingredients.reduce((acc, ele) => {
    const accSet = [...acc];
    const position = acc.findIndex(
      item => item.ingredient?._id === ele.ingredient?._id
    );

    if (acc.length === 0 || position === -1) {
      return [...acc, { quantity: ele.quantity, ingredient: ele.ingredient }];
    }

    accSet[position] = {
      quantity: (ele.quantity || 0) + accSet[position].quantity,
      ingredient: ele.ingredient,
    };

    return accSet;
  }, []);
};
