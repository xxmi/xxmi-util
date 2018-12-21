const {Image} = require('../lib/index');

console.log(Image.isImage('.png')); // true
console.log(Image.isImage('.acc')); // false
