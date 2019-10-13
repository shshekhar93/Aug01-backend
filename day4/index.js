const url = require('url');
const querystring = require('querystring');
const path = require('path');
const fs = require('fs');
const http = require('http');

const server = http.createServer(function(req, res) {
  const urlParts = url.parse(req.url);
  const query = querystring.parse(urlParts.query);

  console.log('got query', query);

  if(urlParts.pathname === '/add') {
    const num1 = parseInt(query.num1);
    const num2 = parseInt(query.num2);

    const sum = num1 + num2;
    res.end(sum.toString());
    return;
  }

  if(req.url === '/') {
    req.url = '/index.html';
  }

  if(!req.url.endsWith('.html')) {
    req.url = 'notFound.html';
  }

  fs.readFile(path.join(__dirname, urlParts.pathname), function(err, fileContents) {
    if(err) {
      console.log('An error occured', err.message);
      fs.readFile(path.join(__dirname, 'notFound.html'), function(err, notFoundContents) {
        res.statusCode = 404;
        res.end(notFoundContents);
      });
    }
    else {
      res.end(fileContents);
    }
  });
});

server.listen(8080);
