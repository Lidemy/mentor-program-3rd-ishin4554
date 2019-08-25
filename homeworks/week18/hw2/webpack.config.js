const path = require('path');

module.exports = {
  context: path.resolve(__dirname, './homeworks/week18/hw2'),
  entry: './index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './homeworks/week18/hw2'),
  },
};
