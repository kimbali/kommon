import toast from 'react-hot-toast';

const registerValidator = (
  formNumber,
  {
    email,
    password,
    name,
    city,
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
    smoke,
    alcohol,
    problems,
    patologies,
  }
) => {
  const errors = [];

  if (formNumber === 1) {
    if (!email) errors.push('email');
    if (!password) errors.push('password');
    if (!confirmPassword) errors.push('confirmPassword');
    if (!name) errors.push('name');
    if (!phone) errors.push('phone');
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
    if (!smoke) errors.push('smoke');
    if (!alcohol) errors.push('alcohol');
    if (!problems) errors.push('problems');
    if (!patologies) errors.push('patologies');
  }

  if (errors.length > 0) {
    toast.error('Missing fields');
  }

  return errors.length > 0 ? errors : null;
};

export const registerRedirectValidator = userInfo => {
  if (!userInfo) {
    return 1;
  }

  const {
    email,
    name,
    city,
    age,
    weight,
    height,
    chest,
    waist,
    buttocks,
    activity,
    porpuse,
    smoke,
    alcohol,
    problems,
    patologies,
  } = userInfo;

  if (!email || !name || !city) {
    return 1;
  }

  if (!age || !weight || !height || !chest || !waist || !buttocks) {
    return 2;
  }

  if (
    !activity ||
    !porpuse ||
    !smoke ||
    !alcohol ||
    !problems ||
    !patologies.length === 0
  ) {
    return 3;
  }

  return 4;
};

export default registerValidator;
