/* eslint-disable import/prefer-default-export */
/* eslint-disable max-classes-per-file */
class Mail {
  /**
   *
   * @param {Object}
   *
   */
  constructor({
    subject, to, html, attachment,
  }) {
    this.from = 'Easy Event <admin.easy-event@mail.namdaoduy.dev>';
    this.subject = subject;
    this.to = to;
    this.html = html;
    this.attachment = attachment || {};
  }
}

export class VerifyUserEmail extends Mail {
  constructor({ ...info }) {
    super({
      subject: '[Easy-Event] Xác nhận email đăng ký tài khoản',
      ...info,
    });
  }
}

export class VerifyGuestEmail extends Mail {
  constructor({ ...info }) {
    super({
      subject: '[Easy-Event] Xác nhận email đăng ký tham gia sự kiện',
      ...info,
    });
  }
}

export class TicketEmail extends Mail {
  constructor({ ...info }) {
    super({
      subject: '[Easy-Event] Vé tham dự sự kiện bởi Easy Event',
      ...info,
    });
  }
}
