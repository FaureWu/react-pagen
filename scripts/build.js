const webpack = require('webpack')
const filesize = require('filesize')
const config = require('../config/webpack.config')
const utils = require('../config/utils')

const params = utils.parseParams()
let build_env = params.BUILD_ENV || 'prod'

process.env.NODE_ENV = 'production'

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

const build = () => {
  console.log('Creating an optimized production build...')
  config.plugins.push(
    new webpack.DefinePlugin({
      'process.env.BUILD_ENV': JSON.stringify(build_env),
    }),
  )
  webpack(config).run((err, stats) => {
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

    const outputPath = config.output.path

    console.log('You may also serve it locally with a static server:')
    console.log('  npm install -g http-serve')
    console.log(`  http-serve ${outputPath}`)
  })
}

build()
