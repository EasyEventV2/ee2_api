import Mailgun from 'mailgun-js';
import configs from 'configs/index';

const { MAILGUN_API_KEY, DOMAIN } = configs;

const mailgun = Mailgun({ apiKey: MAILGUN_API_KEY, domain: DOMAIN });

function send(data) {
  const report = mailgun.messages().send(data);
  return report;
}

export default {
  default: mailgun,
  send,
};
