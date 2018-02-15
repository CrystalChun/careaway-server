const express = require('express');
const app = express();
const bodyParser = require('body-parser'); // Parses request bodies
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
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

// Make sure setup is loaded before anything else 
consign({ cwd: 'services' })
    .include('treatment_management/app/setup')
    .then('treatment_management/app/api')
    .then('treatment_management/app/routes')
    .into(app);

module.exports = app;