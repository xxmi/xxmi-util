const path = require('path');

module.exports = {
  pages: {
    index: {
      entry: './src/main.js',
    },
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': 'src',
        component: path.resolve(__dirname, 'src/components'),
      },
    },
  },
};