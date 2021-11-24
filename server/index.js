const cors = require('cors');

const express = require('express');
const bodyParser = require('body-parser');
const bodyparser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');
const exphbs = require('express-handlebars');
const CronJob = require('cron').CronJob;
const app = express();

// view engine setup
app.engine(
  'handlebars',
  exphbs({ extname: 'hbs', defaultLayout: false, layoutsDir: 'views/ ' })
);
app.set('view engine', 'handlebars');

// parse application/json
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('./uploads', express.static('uploads'));

//static folder
app.use('/public', express.static(path.join(__dirname, 'public')));

const port = 5002;

require('dotenv').config();
require('./db/mongoose');

const user_router = require('../server/src/user/routes/user');

app.use(cors());
app.use(user_router);

app.listen(port, () => {
  console.log(`Cricket booking system backend at http://localhost:${port}`);
});
