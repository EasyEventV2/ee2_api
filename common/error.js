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

export class InvalidEmailFormatError extends ServerAPIError {
  constructor({ ...payload }) {
    super({
      code: 40003,
      message: 'Email is not valid',
      ...payload,
    });
  }
}

export class UnknownActionError extends ServerAPIError {
  constructor({ ...payload }) {
    super({
      code: 40004,
      message: 'Unknown specified action',
      ...payload,
    });
  }
}

export class InvalidBase64InputError extends ServerAPIError {
  constructor({ ...payload }) {
    super({
      code: 40005,
      message: 'Invalid base64 image',
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

export class PermissionDeniedError extends ServerAPIError {
  constructor({ ...payload }) {
    super({
      code: 40300,
      message: 'Permission Denied',
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

export class UserNotFoundError extends ServerAPIError {
  constructor({ ...payload }) {
    super({
      code: 40401,
      message: 'User Not Found',
      ...payload,
    });
  }
}

export class PageNotFoundError extends ServerAPIError {
  constructor({ ...payload }) {
    super({
      code: 40402,
      message: 'Page Not Found',
      ...payload,
    });
  }
}

export class GuestNotFoundError extends ServerAPIError {
  constructor({ ...payload }) {
    super({
      code: 40403,
      message: 'Guest Not Found',
      ...payload,
    });
  }
}

export class EventNotFoundError extends ServerAPIError {
  constructor({ ...payload }) {
    super({
      code: 40404,
      message: 'Event Not Found',
      ...payload,
    });
  }
}

export class EmailVerifiedError extends ServerAPIError {
  constructor({ ...payload }) {
    super({
      code: 40901,
      message: 'This email is already verified',
      ...payload,
    });
  }
}

export class GuestExistedError extends ServerAPIError {
  constructor({ ...payload }) {
    super({
      code: 40902,
      message: 'This email is already registered with this event',
      ...payload,
    });
  }
}

export class TicketApprovedError extends ServerAPIError {
  constructor({ ...payload }) {
    super({
      code: 40903,
      message: 'This ticket is already approved with this event',
      ...payload,
    });
  }
}

export class TicketCheckedInError extends ServerAPIError {
  constructor({ ...payload }) {
    super({
      code: 40904,
      message: 'This ticket is already checked in with this event',
      ...payload,
    });
  }
}

export class TakenUsernameError extends ServerAPIError {
  constructor({ ...payload }) {
    super({
      code: 40905,
      message: 'Username has been taken',
      ...payload,
    });
  }
}

export class TakenEmailError extends ServerAPIError {
  constructor({ ...payload }) {
    super({
      code: 40906,
      message: 'Email has been taken',
      ...payload,
    });
  }
}
