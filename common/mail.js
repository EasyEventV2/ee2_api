/* eslint-disable import/prefer-default-export */
/* eslint-disable max-classes-per-file */
import constant from 'common/constant';
import MailgunService from 'services/mailgun';

const { Email, EmailSubject } = constant;

class Mail {
  /**
   *
   * @param {Object}
   *
   */
  constructor({
    subject, to, html, attachment,
  }) {
    this.data = {
      from: `${Email.NAME} <${Email.ADDRESS}>`,
      subject,
      to,
      html,
      attachment: attachment || {},
    };
  }

  send() {
    return MailgunService.send(this.data);
  }
}

export class VerifyUserEmail extends Mail {
  constructor({ ...info }) {
    super({
      subject: `${EmailSubject.VERIFY_USER}`,
      ...info,
    });
  }
}

export class VerifyGuestEmail extends Mail {
  constructor({ ...info }) {
    super({
      subject: `${EmailSubject.VERIFY_USER}`,
      ...info,
    });
  }
}

export class TicketEmail extends Mail {
  constructor({ ...info }) {
    super({
      subject: `${EmailSubject.TICKET_INFO}`,
      ...info,
    });
  }
}
