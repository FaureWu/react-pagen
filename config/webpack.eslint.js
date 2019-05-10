const path = require('path')

const config = {
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    modules: [
      path.join(__dirname, '../src'),
    ],
  },
}

module.exports = config
