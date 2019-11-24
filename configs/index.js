import deepFreeze from 'deep-freeze';
import baseConfig from 'configs/base';
import devConfig from 'configs/dev';
import localConfig from 'configs/local';
import prodConfig from 'configs/prod';

const env = process.env.APP_ENV;

let envConfig = {};
if (env === 'development') {
  envConfig = devConfig;
} else if (env === 'production') {
  envConfig = prodConfig;
} else {
  envConfig = localConfig;
}

const configs = {
  ...envConfig,
  ...baseConfig,
};

deepFreeze(configs);

export default configs;
