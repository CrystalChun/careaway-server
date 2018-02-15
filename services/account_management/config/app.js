const express = require('express');
const app = express();
const bodyParser = require('body-parser'); // Parses request bodies
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
//const passport = require('passport');
const consign = require('consign');

// Allows only one cross origin site
const corsOptions = {
    origin: 'http://localhost:8080',
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(helmet());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));

consign({ cwd: 'services' })
    .include('account_management/app/setup')
    .then('account_management/app/api')
    .then('account_management/app/routes')
    .into(app);

module.exports = app;