const path = require('path');
const fs = require('fs');

// const text = "Hello world!";
// fs.writeFileSync("test.txt", text);

// __dirname : contains the directory in which this file is located.
// __filename: contains full path to the current filePath.
// const filePath = path.join(__dirname, 'test.txt');
// console.log('filePath is', filePath);

// let fileContents = fs.readFileSync(filePath);
// fileContents = fileContents.toString('utf8');

// console.log('The file contains:');
// console.log(fileContents);

console.log('Starting to read file');
fs.readFile("test.txt", function(err, fileContents) {
  if(err) {
    console.error(err.message);
    return;
  }

  fileContents = fileContents.toString('utf8');

  console.log('File read successful');
  console.log('file contains:', fileContents);
});

console.log('Starting read for other file.');

fs.readFile("../test.txt", function(err, fileContents) {
  if(err) {
    console.error(err.message);
    return;
  }

  fileContents = fileContents.toString('utf8');

  console.log('File read successful');
  console.log('file contains:', fileContents);
});

console.log('File read started!');

setTimeout(function() {
  console.log('Print this after 1 second');
}, 1000);
