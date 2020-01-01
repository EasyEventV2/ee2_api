import User from 'db/models/User';
import constant from 'common/constant';

const { SelectField } = constant;

/**
 *
 * @param {String} id
 */
async function findById(id) {
  const user = await User.findOne(
    { _id: id },
    { password_hashed: SelectField.NO },
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

async function findByUsername(username) {
  const user = await User.findOne(
    { username },
  );
  return user;
}

async function findByEmail(email) {
  const user = await User.findOne(
    { email },
  );
  return user;
}

/**
 *
 * @param {Object} user
 */
async function save(user) {
  const newUser = new User(user);
  const savedUser = await newUser.save();
  return savedUser;
}

/**
 *
 * @param {String} userId
 * @param {Object} updates
 */
async function update(userId, updates) {
  const updatedUser = await User.findOneAndUpdate(
    { _id: userId },
    updates,
    { new: true },
  );
  return updatedUser;
}

export default {
  findById,
  findByUsernameOrEmail,
  findByUsername,
  findByEmail,
  save,
  update,
};
