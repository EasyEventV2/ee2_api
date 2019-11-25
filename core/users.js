import { UserNotFoundError } from 'common/error';
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

export default {
  findUserById,
};
