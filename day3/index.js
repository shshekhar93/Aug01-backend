// _/ What's a server
// Create server in nodeJS
// Send files to client
// Event loop basics.

const http = require('http');
const path = require('path');
const fs = require('fs');

const server = http.createServer(function(req, res) {
  console.log('Received a connection');
  console.log('Method is', req.method);
  console.log('Url is', req.url);
  console.log('Headers are', req.headers);

  res.statusCode = 200;
  res.setHeader('Test-header', 'Test-value');
  res.setHeader('Content-Type', 'text/html');

  fs.readFile(path.join(__dirname, 'index.html'), function(err, indexFileContents) {
    res.end(indexFileContents);
  });
});

server.listen(8080);
