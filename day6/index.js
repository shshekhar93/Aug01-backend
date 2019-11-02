const http = require('http');
const handleRequest =  require('./http-cb'); // Execute the file, and returns value
const handleRequest2 =  require('./http-cb'); // Doesn't execute. Returns from cache.

// const fileStream = fs.createReadStream('large-file.txt');

// let fileData = '';
// fileStream.on('data', function(chunk) {
//   fileStream.pause();

//   setTimeout(function() {
//     console.log('got a chunk of data');
//     fileData += chunk.toString();
//     fileStream.resume();
//   }, 5000);
// });

// fileStream.on('end', function() {
//   console.log('read entire file.');
//   console.log('number of bytes in file:', fileData.length);
// });

const server = http.createServer(handleRequest);

server.listen(8080);
