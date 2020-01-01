import imgur from 'imgur';
import configs from 'configs';
import { getBase64String } from 'utils/base64';
import { InvalidBase64InputError } from 'common/error';

class _ImgurService {
  constructor() {
    imgur.setClientId(configs.IMGUR_CLIENT_ID);
    imgur.setAPIUrl(configs.IMGUR_API_URL);
    this.api = imgur;
  }

  async uploadFromBase64(base64Url) {
    const base64String = getBase64String(base64Url);
    try {
      const response = await this.api.uploadBase64(base64String);
      return response.data;
    } catch (error) {
      throw new InvalidBase64InputError();
    }
  }
}

const ImgurService = new _ImgurService();

export default ImgurService;
