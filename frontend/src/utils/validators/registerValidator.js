const registerValidator = ({
  email,
  password,
  name,
  city,
  confirmPassword,
}) => {
  const errors = [];

  if (!email) errors.push('email');
  if (!password) errors.push('password');
  if (!confirmPassword) errors.push('confirmPassword');
  if (!name) errors.push('name');
  if (!city) errors.push('city');

  return errors.length > 0 ? errors : null;
};

export default registerValidator;
