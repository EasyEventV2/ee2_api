import validator from 'validator';

const isValidEmail = (email) => validator.isEmail(email);

export default {
  isValidEmail,
};
