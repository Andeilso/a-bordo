var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let methodOverride = require("method-override");
let session = require("express-session");
let bodyParser = require("body-parser");
// const cors = require("cors");

var IndexRouter = require('./routes/IndexRouter');
var TeacherRouter = require('./routes/TeacherRouter');
var GuardianRouter = require('./routes/GuardianRouter');

const CookieLogin = require("./middlewares/CookieLogin");

var app = express();
// app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'uploads')));
app.use(methodOverride("_method"));
app.use(session({
  secret: "abordo",
  resave: true,
  saveUninitialized: false
}));
app.use(bodyParser.urlencoded({ extended: true }));

// MIDDLEWARE
app.use(CookieLogin);

app.use('/', IndexRouter);
app.use('/professor', TeacherRouter);
app.use('/responsavel', GuardianRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;