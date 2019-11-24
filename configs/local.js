import baseConfig from 'configs/base';
const DB_URL = 'mongodb://127.0.0.1:27017/easy-event-v2';

const localConfig = {
  DB_URL,
  ...baseConfig,
};

export default localConfig;
