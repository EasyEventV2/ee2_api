const express = require('express');
const app = express();
const port = process.env.PORT || 3003;

const morgan = require('morgan');
app.use(morgan('dev'));

app.use('/', (req, res) => {
    res.json({
        status: "200",
        message: "Welcome to NodeJS"
    })
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})