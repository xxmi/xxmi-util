const path = require('path');

module.exports = {
  mode: 'production',
  entry: [path.resolve(path.join(__dirname, '../src/index.js'))],
  output: {
    filename: 'index.js',
    path: path.resolve(path.join(__dirname, '../lib')),
    libraryTarget: 'this' // 打包为前后端通用模块
  }
};