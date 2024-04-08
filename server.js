const express = require('express');
const db = require('./config/connections');
const routes = require('./routes');

const PORT = process.env.PORT || 3000;

const app = express();

db();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api', require('./routes'));

app.listen(PORT, () => {
        console.log(`API server is running on port ${PORT}!`)
    })
