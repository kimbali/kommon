import { isString } from './typeValidators';

const contactUsValidator = ({ email, message }) => {
  const errors = [];

  if (!isString(email)) errors.push('email');
  if (!isString(message)) errors.push('message');

  return errors.length > 0 ? errors : null;
};

export default contactUsValidator;
