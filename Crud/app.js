var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressHbs=require('express-handlebars');
var mongoose=require('mongoose');
var bodyparser=require('body-parser');
var Handlebars = require('handlebars');


var { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');

mongoose.connect('mongodb://localhost:27017/movie', { useNewUrlParser: true,useUnifiedTopology: true })
.then(res => console.log('Connected to db'));
require('./model/addmovie');



var adminRouter = require('./routes/admin');

var app = express();
app.use(bodyparser.urlencoded({
  extended:true
}));
app.use(bodyparser.json());

// view engine setup
app.engine('.hbs',expressHbs({defaultLayout:'layout',handlebars: allowInsecurePrototypeAccess(Handlebars),extname:'.hbs'}));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', adminRouter);

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
