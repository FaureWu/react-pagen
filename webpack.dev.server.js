const path = require('path')

module.exports = {
  clientLogLevel: 'none',
  compress: true,
  contentBase: './dist',
  disableHostCheck: true,
  headers: {
    'access-control-allow-origin': '*',
  },
  historyApiFallback: {
    disableDotRule: true,
  },
  host: '0.0.0.0',
  hot: true,
  https: false,
  inline: true,
  quiet: true,
  overlay: true,
  watchContentBase: true,
  publicPath: '/',
}
