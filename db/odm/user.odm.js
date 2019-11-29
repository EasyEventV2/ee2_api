/* eslint-disable object-shorthand */
import User from 'db/models/User';

/**
 *
 * @param {String} id
 */
async function findById(id) {
  const user = await User.findOne(
    { _id: id },
    { password_hashed: 0 },
  );
  return user;
}

async function findByUsernameOrEmail(username) {
  const user = await User.findOne().or([
    { username: username },
    { email: username },
  ]);
  return user;
}

export default {
  findById,
  findByUsernameOrEmail,
};
