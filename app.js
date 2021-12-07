const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const route = require('./routes/index');

const app = express();



// view engine setup
app.set('views', [path.join(__dirname, 'views'), path.join(__dirname, 'components')]);
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));





route(app);
////////////////////////////////////////
//missing reset-password and login page
/////////////////////////////////////////


module.exports = app;
