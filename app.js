const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');
const ordersRouter = require('./routes/orders');
const accountRouter = require('./routes/account');
const chartsRouter = require('./routes/charts');
const helpRouter = require('./routes/help');
const notificationRouter = require('./routes/notifications');
const settingsRouter = require('./routes/settings');
const addProductsRouter = require('./routes/addProducts');
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/orders', ordersRouter);
app.use('/account', accountRouter);
app.use('/charts', chartsRouter);
app.use('/help', helpRouter);
app.use('/notifications', notificationRouter);
app.use('/settings', settingsRouter);
app.use('/addProducts', addProductsRouter);
////////////////////////////////////////
//missing reset-password and login page
/////////////////////////////////////////

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
