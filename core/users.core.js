import { UserNotFoundError, TakenUsernameError, TakenEmailError, InvalidEmailFormatError } from 'common/error';
import userODM from 'db/odm/user.odm';
import encryption from 'utils/encryption';
import validation from 'utils/validation';

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

async function saveNewUser(userInfo) {
  const {
    username, email, password, fullName, phoneNumber,
  } = userInfo;
  const exUserWithUserName = await userODM.findByUsername(username);
  if (exUserWithUserName) {
    throw new TakenUsernameError();
  }
  const exUserWithEmail = await userODM.findByEmail(email);
  if (exUserWithEmail) {
    throw new TakenEmailError();
  }
  if (!validation.isValidEmail(email)) {
    throw new InvalidEmailFormatError();
  }

  const passwordHashed = encryption.encrypt(password);

  const newUser = {
    username,
    password_hashed: passwordHashed,
    email,
    email_verified: false,
    phone_number: phoneNumber,
    full_name: fullName,
    account_type: 'normal',
  };

  const savedUser = await userODM.save(newUser);
  return {
    savedUser,
  };
}

export default {
  findUserById,
  saveNewUser,
};
