const {
  DB_HOST, DB_PORT, DB_USER, DB_PWD, SECRET_KEY,
} = process.env;

const DB_URL = `mongodb://${DB_HOST}:${DB_PORT}/easy-event-v2`;

const prodConfig = {
  DB_URL,
  DB_USER,
  DB_PWD,
  SECRET_KEY,
};

export default prodConfig;
