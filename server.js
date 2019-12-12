/* eslint-disable no-console */
require('dotenv').config({
  path: `${__dirname}/.env`,
});
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongo = require('db/utils/connection');
const routes = require('routes/index').default;
const errorHandler = require('middlewares/errorHandler').default;
const notFoundRequestHandler = require('middlewares/notFoundRequestHandler').default;

const app = express();
const port = process.env.PORT || 3003;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use('/', routes);
app.use(errorHandler);
app.use(notFoundRequestHandler);

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
