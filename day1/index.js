const express = require('express');

// console.log('Hello World!');

// var arr = [1,2,3];
// arr.forEach(function(elem) {
//   console.log('element is: ', elem);
// });

// let num = 13;
// num = 50;
// console.log('sum is', num + 7);

function foo(shouldDeclare) {
  if(shouldDeclare) {
    let num = 15;
  }
  console.log('num is ', num);
}

foo(true);
