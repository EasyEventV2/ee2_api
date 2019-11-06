const {
  DB_HOST, DB_PORT, DB_USER, DB_PWD,
} = process.env;

const DB_URL = `mongodb://${DB_HOST}:${DB_PORT}/easy-event-v2`;
const devConfig = {
  DB_URL,
  DB_USER,
  DB_PWD,
};

export default devConfig;
