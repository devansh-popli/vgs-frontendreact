const path = require('path');

module.exports = {
  // Your other webpack configuration settings...

  resolve: {
    fallback: {
      https: require.resolve('https-browserify'),
    },
  },
};