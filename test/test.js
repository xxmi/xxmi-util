const {Image} = require('../lib/index');

console.log(Image.isImage('.png')); // true
console.log(Image.isImage('.acc')); // false

const ImageTool = require('../lib/image.js');
console.log(ImageTool.isImage('.png')); // true

const tool = require('../lib/tool.js');
console.log(`isNumber('abc')`, tool.isNumber('0123'));
