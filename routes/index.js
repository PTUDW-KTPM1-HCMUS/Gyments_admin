const siteRouter = require('../components/sites/site');
const productRouter = require('../components/products/products');
const userRouter = require('../components/users/users');
const createError = require("http-errors");

function route(app){
  app.use('/products',productRouter);
  app.use('/user',userRouter);
  app.use('/', siteRouter);

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
