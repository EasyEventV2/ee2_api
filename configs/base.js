const {
  DB_HOST, DB_PORT, DB_USER, DB_PWD, JWT_SECRET_KEY,
} = process.env;

const baseConfig = {
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PWD,
  JWT_SECRET_KEY,
};

export default baseConfig;
