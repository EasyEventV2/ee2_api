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

/**
 *
 * @param {String} uname
 */
async function findByUsernameOrEmail(uname) {
  const user = await User.findOne().or([
    { username: uname },
    { email: uname },
  ]);
  return user;
}

export default {
  findById,
  findByUsernameOrEmail,
};
