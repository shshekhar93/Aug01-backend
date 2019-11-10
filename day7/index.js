const express = require('express');
const Parser = require('body-parser');
const app = express();

// Logging middleware
app.use(function(req, res, next) {
  console.log('Received a request for path:', req.path);
  next();
});

app.use('/favicon.ico', function(req, res) {
  res.end();
});

app.use(express.static('public'));

const urlEncodedParser = Parser.urlencoded({
  extended: false
});
app.use(urlEncodedParser);
// After this middleware parsed body would be assigned to req.body

// Middleware for add - GET
app.get('/add', function(req, res, next) {
  console.log('in add middleware');
  res.send('get add page');
});


// Middleware for add - PATCH
app.all('/add', function(req, res) {
  if(req.method !== 'PATCH') {
    return next();
  }
  console.log('request body was', req.body);
  res.send('post add page');
});

// Middleware for sub
app.use('/sub', function(req, res) {
  // do auhentication here and all next();
  console.log('in sub middleware');
  res.send({ message: 'Processing Sub' });
});

app.get('/sub/abcd', function() {
  res.send('ABCD html');
});

// catch all middleware
app.use(function(req, res) {
  console.log('in catch-all middleware');
  res.json({ message: 'Path not found' });
});

app.listen(8000);
