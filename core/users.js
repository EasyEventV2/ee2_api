import configs from 'configs/index';
import jwt from 'jsonwebtoken';
import encryption from 'utils/encryption';
import { UserNotFoundError, PasswordNotMatchError } from 'common/error';
import User from 'db/models/User';

/**
 *
 * Find an user that matches given userId
 * @param {String} userId
 * @returns {Object} response data: User
 */
async function findUserById(userId) {
  let data = {};
  const user = await User.findOne(
    { _id: userId },
    { _id: 0, password_hashed: 0, password_salt: 0 },
  );

  if (!user) {
    const err = new UserNotFoundError();
    throw err;
  }
  data = user;
  return data;
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
    const err = new UserNotFoundError({ code: 40402, message: 'Invalid Username' });
    throw err;
  }
  if (encryption.isEqual(pwd, user.get('password_hashed'))) {
    const token = jwt.sign({ uid: user.get('_id') }, configs.SECRET_KEY, { expiresIn: '5h' });
    data = {
      // eslint-disable-next-line object-shorthand
      token: token,
    };
  } else {
    throw new PasswordNotMatchError();
  }
  return data;
}

export default {
  findUserById,
  checkLogin,
};
