import deepFreeze from 'deep-freeze';
import devConfig from './dev';
import localConfig from './local';
import prodConfig from './prod';

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
};

deepFreeze(configs);

export default configs;
