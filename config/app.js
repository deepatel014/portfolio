var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// database setup
let mongoose = require('mongoose');
let DB = require('./db');

// pointing mongoose to the DB URI
mongoose.connect(DB.URI, {useNewUrlParser: true});
mongoose.set('strictQuery', false);

let mongoDB = mongoose.connection;
mongoDB.on('error', console.error.bind(console, 'Connection Error: '));
mongoDB.once('open' , ()=>{
  console.log("Connected to MongoDB......");
})



// router variables set for the views.
var indexRouter = require('../routes/index');
var usersRouter = require('../routes/users');
var aboutRouter = require('../routes/about');
var serviceRouter = require('../routes/services');
var contactRouter = require('../routes/contact');
var projectRouter = require('../routes/projects');
var loginRouter = require('../routes/login');

// port function testing
function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}
// port function ends

var app = express();

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../node_modules')));

app.use('/static', express.static(path.join(__dirname, '../public')))
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/about',aboutRouter);
app.use('/services',serviceRouter);
app.use('/contacts',contactRouter);
app.use('/projects',projectRouter);
app.use('/login', loginRouter);

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

// connecting to port from app.js instead of server.js
// var port = normalizePort(process.env.PORT || '3000');
// app.listen(port, function() {
//   console.log(`App running on port ${port}`);
// })
