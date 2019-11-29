/* eslint-disable max-classes-per-file */
export class ServerAPIError extends Error {
  /**
   *
   * @param {Number} code
   * @param {String} message
   * @param {Object} data
   */
  constructor({ code, message, data }) {
    super();
    this.code = code;
    this.message = message;
    this.data = data || {};
    this.status = parseInt(code.toString().slice(0, 3), 10);
  }
}

export class UserNotFoundError extends ServerAPIError {
  constructor({ ...payload }) {
    super({
      code: 40401,
      message: 'User Not Found',
      ...payload,
    });
  }
}

export class InvalidUsernameOrEmailError extends ServerAPIError {
  constructor({ ...payload }) {
    super({
      code: 40001,
      message: 'Invalid Username or Email',
      ...payload,
    });
  }
}

export class InvalidPasswordError extends ServerAPIError {
  constructor({ ...payload }) {
    super({
      code: 40002,
      message: 'Invalid Password',
      ...payload,
    });
  }
}

export class UnauthorizedError extends ServerAPIError {
  constructor({ ...payload }) {
    super({
      code: 40101,
      message: 'Unauthorized',
      ...payload,
    });
  }
}

export class InvalidTokenError extends ServerAPIError {
  constructor({ ...payload }) {
    super({
      code: 40301,
      message: 'Fobbiden: Invalid Token',
      ...payload,
    });
  }
}

export class TokenExpiredError extends ServerAPIError {
  constructor({ ...payload }) {
    super({
      code: 40302,
      message: 'Fobbiden: Token Expired',
      ...payload,
    });
  }
}
