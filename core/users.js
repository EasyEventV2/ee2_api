/* eslint-disable object-shorthand */
import configs from 'configs/index';
import jwt from 'jsonwebtoken';
import encryption from 'utils/encryption';
import { UserNotFoundError, InvalidPasswordError, InvalidUsernameError } from 'common/error';
import User from 'db/models/User';

/**
 *
 * Find an user that matches given userId
 * @param {String} userId
 * @returns {Object} response data: User
 */
async function findUserById(userId) {
  const user = await User.findOne(
    { _id: userId },
    { _id: 0, password_hashed: 0, password_salt: 0 },
  );

  if (!user) {
    throw new UserNotFoundError();
  }
  return user;
}

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
    const err = new InvalidUsernameError();
    throw err;
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
  findUserById,
  checkLogin,
};
