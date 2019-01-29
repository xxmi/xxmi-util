const path = require('path');

function resolve (url) {
  return path.resolve(path.join(__dirname, url));
}

module.exports = {
  mode: 'production', // production：发布模式  development：开发模式
  entry: {
    index: resolve('../src/index.js'),
    datetime: resolve('../src/datetime.js'),
    image: resolve('../src/image.js'),
    tool: resolve('../src/tool.js'),
    util: resolve('../src/util.js'),
    validator: resolve('../src/validator.js')
  },
  output: {
    filename: '[name].js',
    path: path.resolve(path.join(__dirname, '../lib')),
    libraryTarget: 'this' // 打包为前后端通用模块
  }
};