/**
 * This line is added by node JS before executing the file.
 */
// function xyz (exports, require, module, __filename, __dirname) {

const fs = require('fs');

function handleHTTPRequest(req, res) {
  const stream = fs.createReadStream('large-file.txt');

  // stream.on('data', function(chunk) {
  //   console.log('sending partial file to browser.');
  //   res.write(chunk);
  // });

  // stream.on('end', function() {
  //   res.end();
  // });

  stream.pipe(res);
}

module.exports = handleHTTPRequest;

/**
 * This line is added by ndoe Js internally. 
 */
// }


//require function internally
/* function require(filename) { */
  // convert to absolute filename.

  // read entire file 
  // prepend the function prefix
  // append the function close suffix
  // parse the entire file into a function called xyz

/*  const module = {};
  const exports = {};
  module.exports = exports;

  xyz(module, exports, require, __dirname, __filename);

  return module.exports;*/
/* } */
