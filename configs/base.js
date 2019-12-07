const {
  DB_HOST, DB_PORT, DB_USER, DB_PWD, JWT_SECRET_KEY, MAILGUN_API_KEY, DOMAIN,
} = process.env;

const baseConfig = {
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PWD,
  JWT_SECRET_KEY,
  MAILGUN_API_KEY,
  DOMAIN,
};

export default baseConfig;
