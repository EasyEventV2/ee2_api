const deepFreeze = require('deep-freeze');
const dotenv = require('dotenv');
dotenv.config();
const devConfig = require('./dev');
const prodConfig = require('./prod');
const localConfig = require('./local');

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
    ...envConfig
}

deepFreeze(configs);

module.exports = configs;
