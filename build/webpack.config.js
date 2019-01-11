const path = require('path');

const a = path.resolve(path.join(__dirname, '../src/index.js'));

function resolve (url) {
  return path.resolve(path.join(__dirname, url));
}

module.exports = {
  mode: 'production', // production：发布模式  development：开发模式
  entry: {
    index: resolve('../src/index.js'),
    image: resolve('../src/image.js'),
    tool: resolve('../src/tool.js')
  },
  output: {
    filename: '[name].js',
    path: path.resolve(path.join(__dirname, '../lib')),
    libraryTarget: 'this' // 打包为前后端通用模块
  }
};