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

async function findByVerifiedEmail(email) {
  const user = await User.findOne({}, { password_hashed: SelectField.NO }).and([
    { email },
    { email_verified: true },
  ]);
  return user;
}

export default {
  findById,
  findByUsernameOrEmail,
  findByVerifiedEmail,
};
