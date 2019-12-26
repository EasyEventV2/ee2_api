import imgur from 'imgur';
import configs from 'configs';
import { getBase64String } from 'utils/base64';

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
      // TODO: remove later
      console.log(response);
      // Return an object with fields: link, id, width, height, size, ...
      return response.data;
    } catch (error) {
      // TODO: remove later
      console.log(error);
      return error;
    }
  }
}

const ImgurService = new _ImgurService();

export default ImgurService;
