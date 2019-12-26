import baseConfig from 'configs/base';

const DB_URL = `mongodb://${baseConfig.DB_HOST}:${baseConfig.DB_PORT}/easy-event-v2`;
const FE_URL = 'https://easy-event.tk/';

const devConfig = {
  DB_URL,
  FE_URL,
};

export default devConfig;
