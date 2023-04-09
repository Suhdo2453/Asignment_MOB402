var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');

var homeRouter = require('./routes/home');
var accountsRouter = require('./routes/accounts');
var productRouter = require('./routes/products');
var categoryRouter = require('./routes/category');
var middleware = require('./middlewares/checkLogin');
var apiRouter = require('./routes/api');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'Kejfkl3k4u9k848Kifje9fjeKjfjfl937IFu39J',
  resave: true,
  saveUninitialized: true
}));


app.use('/api', apiRouter);
app.use('/', homeRouter);
app.use('/accounts',
    middleware.LoginRequired,
    middleware.SortMiddleware,
    accountsRouter);
app.use('/products',
    middleware.LoginRequired,
    middleware.SortMiddleware,
    productRouter);
app.use('/category', 
    middleware.LoginRequired, 
    middleware.SortMiddleware,
    categoryRouter);

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

  // API Address: /api/xxxx
  if(req.originalUrl.indexOf('/api') === 0){
    res.json(
      {
        msg: err.message
      }
    );
  }else{
    res.render('error');
  }
});

module.exports = app;
