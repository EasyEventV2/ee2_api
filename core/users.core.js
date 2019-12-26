import configs from 'configs/index';
import jwt from 'jsonwebtoken';
import {
  UserNotFoundError, TakenUsernameError, TakenEmailError, InvalidEmailFormatError,
} from 'common/error';
import userODM from 'db/odm/user.odm';
import encryption from 'utils/encryption';
import validation from 'utils/validation';
import { VerifyUserEmail } from 'common/mail';

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

/**
 *
 * @param {Object} userInfo
 */
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
  const token = jwt.sign({ uid: savedUser.id }, configs.JWT_SECRET_KEY, { expiresIn: '5h' });

  const data = {
    userId: savedUser.id,
    token,
  };

  const verifyLink = `${configs.FE_URL}/verify?userId=${savedUser.id}`;
  const verifyEmail = new VerifyUserEmail({
    to: `${savedUser.email}`,
    html: `Xin chào ${savedUser.full_name}, <br/>
    Bạn vừa mới đăng ký tạo tài khoản mới trên Easy-Event <br/>
    Chúng tôi cần bạn xác nhận email đăng ký, vui lòng ấn vào đường dẫn sau để hoàn tất: <br/>
    <a href="${verifyLink}">${verifyLink}</a><br/>
    Chúc bạn có những trải nghiệm tuyệt với cùng Easy-Event`,
  });

  verifyEmail.send();
  return data;
}

async function updateVerifyEmail(userId) {
  const user = await userODM.findById(userId);
  if (!user) {
    throw new UserNotFoundError();
  }
  const updates = { email_verified: true };
  const updatedUser = await userODM.update(userId, updates);
  return {
    updatedUser,
  };
}

export default {
  findUserById,
  saveNewUser,
  updateVerifyEmail,
};
