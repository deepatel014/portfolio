let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

// initializing the passport library for login authentication
// var passport = require("passport"),
//     bodyParser = require("body-parser"),
//     LocalStrategy = require("passport-local"),
//     passportLocalMongoose = s
//         require("passport-local-mongoose")
// const User = require("./model/User");

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

// using the passport session variables and functions
// app.use(passport.initialize());
// app.use(passport.session());
  
// passport.use(new LocalStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());


// router letiables set for the views.
let indexRouter = require('../routes/index');
let usersRouter = require('../routes/users');
// let aboutRouter = require('../routes/about');
// let serviceRouter = require('../routes/services');
// let contactRouter = require('../routes/contact');
// let projectRouter = require('../routes/projects');
// let loginRouter = require('../routes/login');
let businessRouter = require('../routes/business');

// port function testing
function normalizePort(val) {
  let port = parseInt(val, 10);

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

let app = express();

// view engine setup
app.set('views', path.join(__dirname, '../views'));
// app.set('views', path.join(__dirname, '../views/contacts'));
app.set('view engine', 'ejs');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../public')));
app.use(express.static(path.join(__dirname, '../../node_modules')));

app.use('/static', express.static(path.join(__dirname, '../../public')))
app.use('/', indexRouter);
app.use('/users', usersRouter);
// app.use('/about',aboutRouter);
// app.use('/services',serviceRouter);
// app.use('/contacts',contactRouter);
// app.use('/projects',projectRouter);
// app.use('/login', loginRouter);
app.use('/business',businessRouter);

// app.get("/login", function (req, res) {
//   res.render("login");
// });

// //Handling user login
// app.post("/login", async function(req, res){
//   try {
//       // check if the user exists
//       const user = await User.findOne({ username: req.body.username });
//       if (user) {
//         //check if password matches
//         const result = req.body.password === user.password;
//         if (result) {
//           res.render("secret");
//         } else {
//           res.status(400).json({ error: "password doesn't match" });
//         }
//       } else {
//         res.status(400).json({ error: "User doesn't exist" });
//       }
//     } catch (error) {
//       res.status(400).json({ error });
//     }
// });
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
// let port = normalizePort(process.env.PORT || '3000');
// app.listen(port, function() {
//   console.log(`App running on port ${port}`);
// })
