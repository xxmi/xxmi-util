const path = require('path');

module.exports = {
  pages: {
    index: {
      entry: 'examples/main.js'
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': 'examples',
        component: path.resolve(__dirname, 'examples/components')
      }
    }
  }
};