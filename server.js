/* eslint-disable no-console */
require('dotenv').config({
  path: `${__dirname}/.env`,
});
const express = require('express');
const morgan = require('morgan');
const mongo = require('./db/utils/connection');


const app = express();
const port = process.env.PORT || 3003;

app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send('<p>Welcome to EasyEvent V2 API</p>');
});

const startApp = async () => {
  try {
    await mongo.open();
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};
startApp();
