const {
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PWD,
  JWT_SECRET_KEY,
  MAILGUN_API_KEY,
  DOMAIN,
} = process.env;

const baseConfig = {
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PWD,
  JWT_SECRET_KEY,
  MAILGUN_API_KEY,
  DOMAIN,
  IMGUR_CLIENT_ID: '8ce04a19c6e2d8c',
  IMGUR_API_URL: 'https://api.imgur.com/3/',
};

export default baseConfig;
