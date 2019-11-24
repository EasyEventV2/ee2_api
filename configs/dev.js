import baseConfig from 'configs/base';

const DB_URL = `mongodb://${baseConfig.DB_HOST}:${baseConfig.DB_PORT}/easy-event-v2`;
const devConfig = {
  DB_URL,
};

export default devConfig;
