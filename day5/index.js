const url = require('url');
const querystring = require('querystring');
const path = require('path');
const fs = require('fs');
const http = require('http');

function calculateSumAndSendResponse(numObj, res) {
  const num1 = parseInt(numObj.number1) || 0;
  const num2 = parseInt(numObj.number2) || 0;

  const sum = num1 + num2;

  return fs.readFile(path.join(__dirname, 'add.html'), 'utf8', function(err, addHtml) {
    addHtml = addHtml.replace('{sum}', sum);
    res.end(addHtml);
  });
}

const server = http.createServer(function(req, res) {
  const urlParts = url.parse(req.url);
  const query = querystring.parse(urlParts.query);

  if(req.method === 'GET' && urlParts.pathname === '/add') {
    return calculateSumAndSendResponse(query, res);
  }

  if(req.method === 'POST' && urlParts.pathname === '/add') {
    const contentLength = parseInt(req.headers['content-length']);

    let requestBody = '';
    req.on('data', function(chunk) {
      requestBody = requestBody + chunk.toString();

      if(requestBody.length >= contentLength) {
        // do the processing.

        const parsedBody = querystring.parse(requestBody);
        calculateSumAndSendResponse(parsedBody, res);
      }
    });
    return;
  }

  return res.end('File not found!');
});

server.listen(8080);