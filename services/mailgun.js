import Mailgun from 'mailgun-js';
import configs from 'configs/index';

const { MAILGUN_API_KEY, DOMAIN } = configs;

const mailgun = Mailgun({ apiKey: MAILGUN_API_KEY, domain: DOMAIN });

class _MailgunService {
  constructor() {
    this.api = mailgun;
    this.send = (data) => this.api.messages().send(data);
  }
}

const MailgunService = new _MailgunService();

export default MailgunService;
