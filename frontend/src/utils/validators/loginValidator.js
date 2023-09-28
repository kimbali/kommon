const loginValidator = ({ email, password }) => {
  const errors = [];

  if (!email) errors.push('email');
  if (!password) errors.push('password');

  return errors.length > 0 ? errors : null;
};

export default loginValidator;
