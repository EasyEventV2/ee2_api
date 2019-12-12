import { UserNotFoundError } from 'common/error';
import userODM from 'db/odm/user.odm';

/**
 *
 * Find an user that matches given userId
 * @param {String} userId
 * @returns {Object} response data: User
 */
async function findUserById(userId) {
  const user = await userODM.findById(userId);

  if (!user) {
    throw new UserNotFoundError();
  }
  return user;
}

export default {
  findUserById,
};
