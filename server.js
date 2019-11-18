/* eslint-disable no-console */
require('dotenv').config({
  path: `${__dirname}/.env`,
});
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongo = require('./db/utils/connection');
const routes = require('./routes/index').default;

const app = express();
const port = process.env.PORT || 3003;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use('/', routes);

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
