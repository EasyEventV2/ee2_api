const dotenv = require('dotenv');
dotenv.config();

const DB_USER = process.env.DB_USER;
const DB_PWD = process.env.DB_PWD;
const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT;

const DB_URL = `mongodb://${DB_USER}:${DB_PWD}@${DB_HOST}:${DB_PORT}/easy-event-v2`;

module.exports = {
    DB_URL
}