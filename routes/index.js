const siteRouter = require('../components/sites/site');
const productRouter = require('../components/products/products');
const userRouter = require('../components/users/users');
const authRouter = require('../components/auth/auth');
const apiRouter = require('../components/api/api');
const orderRouter = require('../components/orders/order');
const guard = require('../Middlewares/guard');
const createError = require("http-errors");

function route(app){
  app.use('/products',guard,productRouter);
  app.use('/user',guard,userRouter);
  app.use('/auth', authRouter);
  app.use('/orders', orderRouter);
  app.use('/api', apiRouter);
  app.use('/',guard ,siteRouter);

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

}




module.exports = route;
