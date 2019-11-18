import { CastError } from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../db/models/User';

const secretKey = process.env.SECRET_KEY;

/**
 *
 * @name findById
 * @description find an user that matches given userId
 * @param {String} userId
 * @returns {Object} response data
 */
async function findById(userId) {
  const result = {};
  try {
    const user = await User
      .findOne({ _id: userId }, { _id: 0, password_hashed: 0, password_salt: 0 });
    if (!user) {
      result.status = 404;
      result.body = {
        error: {
          code: 40401,
          message: 'Not Found: User Not Found',
          data: {},
        },
      };
    } else {
      result.status = 200;
      result.body = {
        data: user,
      };
    }
  } catch (err) {
    if (err instanceof CastError) {
      result.status = 400;
      result.body = {
        error: {
          code: 40001,
          message: 'Bad Request: Unable to cast ObjectId',
          data: {},
        },
      };
    } else {
      result.status = 500;
      result.body = {
        error: {
          code: 500,
          message: 'Internal Server Error',
          data: {},
        },
      };
    }
  }
  return result;
}

async function checkLogin(_username, _password) {
  const result = {
    status: 500,
    body: {
      error: {
        code: 500,
        message: 'Internal Server Error',
        data: {},
      },
    },
  };
  try {
    const user = await User.findOne({ username: _username });
    if (!user) {
      result.status = 404;
      result.body.error.code = 40402;
      result.body.error.message = 'User Not Found';
      return result;
    }
    const isCorrectPwd = await bcrypt.compare(_password, user.get('password_hashed'));
    if (isCorrectPwd) {
      const jwToken = jwt.sign({ username: user.get('username') }, secretKey, { expiresIn: '5h' });
      result.status = 200;
      result.body = {
        data: {
          token: jwToken,
        },
      };
    } else {
      result.status = 400;
      result.body.error.code = 40002;
      result.body.error.message = 'Invalid password';
    }
  } catch (err) {
    console.error(err);
  }
  return result;
}

export default { findById, checkLogin };
