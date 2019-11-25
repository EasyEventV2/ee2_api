/* eslint-disable object-shorthand */
import configs from 'configs/index';
import jwt from 'jsonwebtoken';
import encryption from 'utils/encryption';
import { InvalidPasswordError, InvalidUsernameError } from 'common/error';
import User from 'db/models/User';

/**
 * Check if given information is correct for login
 * @param {String} usr
 * @param {String} pwd
 * @returns {Object} response data: bearer token with userId if success
 */
async function checkLogin(usr, pwd) {
  let data = {};
  const user = await User.findOne({ username: usr });
  if (!user) {
    throw new InvalidUsernameError();
  }
  if (encryption.isEqual(pwd, user.password_hashed)) {
    const userId = user.get('_id');
    const token = jwt.sign({ uid: userId }, configs.JWT_SECRET_KEY, { expiresIn: '5h' });
    data = {
      userId: userId,
      token: token,
    };
  } else {
    throw new InvalidPasswordError();
  }
  return data;
}

export default {
  checkLogin,
};
