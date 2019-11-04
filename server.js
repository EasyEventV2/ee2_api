const express = require('express');
const app = express();
const port = process.env.PORT || 3003;
const mongooseConnnection = require('./db/utils/connection');

const morgan = require('morgan');
app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.send('<p>Welcome to EasyEvent V2 API</p>')
});

const startApp = async () => {
    await mongooseConnnection.connect();
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    })
}

startApp();