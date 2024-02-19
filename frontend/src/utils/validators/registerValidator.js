import toast from 'react-hot-toast';
import { translate } from '../../traducciones/i18n';

const registerValidator = (
  formNumber,
  {
    email,
    password,
    name,
    address,
    confirmPassword,
    phone,
    age,
    weight,
    height,
    chest,
    waist,
    buttocks,
    activity,
    porpuse,
    problems,
    patologies,
  }
) => {
  const errors = [];

  if (formNumber === 1) {
    if (!email) errors.push('email');
    if (!name) errors.push('name');
    if (!phone) errors.push('phone');
  }

  if (formNumber === 11) {
    if (!password) errors.push('password');
    if (!confirmPassword) errors.push('confirmPassword');
  }

  if (formNumber === 12) {
    if (!address) errors.push('address');
  }

  if (formNumber === 2) {
    if (!age) errors.push('age');
    if (!weight) errors.push('weight');
    if (!height) errors.push('height');
    if (!chest) errors.push('chest');
    if (!waist) errors.push('waist');
    if (!buttocks) errors.push('buttocks');
  }

  if (formNumber === 3) {
    if (!activity) errors.push('activity');
    if (!porpuse) errors.push('porpuse');
    if (!problems) errors.push('problems');
  }

  if (errors.length > 0) {
    toast.error(translate('fillEmpty'));
  }

  return errors;
};

export const registerRedirectValidator = user => {
  if (!user) {
    return 1;
  }
  console.log(5, user);
  const {
    email,
    name,
    age,
    weight,
    height,
    chest,
    waist,
    buttocks,
    activity,
    porpuse,
    problems,
    patologies,
    phone,
  } = user;

  if (!email || !name || !phone) {
    return 1;
  }

  if (!age || !weight || !height || !chest || !waist || !buttocks) {
    return 2;
  }

  if (!activity || !porpuse || !problems || !patologies.length === 0) {
    return 3;
  }

  return 4;
};

export default registerValidator;
