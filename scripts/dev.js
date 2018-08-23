const webpack = require('webpack')
const filesize = require('filesize')
const childProcess = require('child_process')
const clearConsole = require('react-dev-utils/clearConsole')
const openBrowser = require('react-dev-utils/openBrowser')
const WebpackDevServer = require('webpack-dev-server')
const chalk = require('chalk')
const config = require('../webpack.config.dev')
const devServerConfig = require('../webpack.dev.server')

process.env.NODE_ENV = 'development'

const printErrors = (summary, errors) => {
  console.error(summary)
  console.log()
  errors.forEach(err => {
    console.error(err.message || err)
    console.log()
  })
}

const printFilesInfo = stats =>
  stats
    .toJson()
    .assets.map(asset =>
      console.log(`${asset.name}    ${filesize(asset.size)}`),
    )

const host = '0.0.0.0'
const port = '8080'

const dev = () => {
  console.log('Creating an development build...')
  config.plugins.push(
    new webpack.DefinePlugin({
      'process.env.BUILD_ENV': JSON.stringify('dev'),
    }),
  )
  const compiler = webpack(config)
  compiler.watch({ aggregateTimeout: 300 }, (err, stats) => {
    if (process.stdout.isTTY) {
      clearConsole()
    }
    console.log('The development build done')
    if (err) {
      printErrors('Failed to compile.', [err])
      process.exit(1)
    }

    if (stats.compilation.errors.length) {
      printErrors('Failed to compile.', stats.compilation.errors)
      process.exit(1)
    }

    console.log()
    printFilesInfo(stats)
    console.log()

    console.log('Compiled successfully.')
    console.log()
  })
  const devServer = new WebpackDevServer(compiler, devServerConfig)
  devServer
    .listen(port, host, err => {
      if (err) {
        return console.log(err)
      }
      if (process.stdout.isTTY) {
        clearConsole()
      }
      console.log(chalk.cyan('Starting the development server...\n'))
      openBrowser(`http://${host}:${port}`)
    })

    process.on('SIGINT', function() {
      devServer.close()
      process.exit()
    })
    process.on('SIGTERM', function() {
      devServer.close()
      process.exit()
    })
}

dev()
