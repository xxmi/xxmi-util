const {image} = require('../lib/index');

console.log(image.isImage('.png')); // true
console.log(image.isImage('.acc')); // false
