const express = require('express');
const Parser = require('body-parser');
const CookieParser = require('cookie-parser');
const session = require('express-session');
const app = express();


app.use(express.static('public'));

app.use(CookieParser('keyboard cat'));

// const SESSION_STORE = {};
// // Session middleware.
// app.use(function(req, res, next) {
//   let sidValue = req.cookies.sid;
//   if(!sidValue) {
//     sidValue = Math.random().toString(36);
//     res.cookie('sid', sidValue);
//     SESSION_STORE[sidValue] = {};
//   }

//   req.session = SESSION_STORE[sidValue];
//   next();
// });

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
}));

app.use(Parser.urlencoded({
  extended: false
}));

app.get('/home', function(req, res) {
  console.log('Already stored session is', req.session);
  req.session.message = 'Hello world';
  res.send('<html><body><h1>Welcome to my home page</h1></body></html>');
});

app.get('/test', function(req, res) {
  console.log('old visited time', req.session.last_visit_time);

  const newTime = Date.now();
  console.log('old visited time', req.session.last_visit_time);

  req.session.last_visit_time = newTime;
  res.end();
});

app.use(function(req, res) {
  console.log('in catch all handler');
  res.send({ message: 'Path not found' });
});

app.listen(8000);
