const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const utils = require('./utils')

const pagesConfig = utils.readPages(utils.parseParams().MATCH)
const pagesEntry = utils.getPagesEntry(pagesConfig)

module.exports = {
  mode: 'development',
  entry: {
    _hd: path.resolve(__dirname, '../src/generator/hd/index.js'),
    ...pagesEntry,
  },
  devtool: 'cheap-module-source-map',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name]/[name].js',
    publicPath: '/../',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    modules: [
      path.join(__dirname, '../node_modules'),
      path.join(__dirname, '../src'),
    ],
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.eot$/, /\.svg$/, /\.ttf$/, /\.woff$/],
            loader: require.resolve('url-loader'),
            options: {
              limit: 10000,
              name: 'media/[name].[ext]',
            },
          },
          {
            test: /\.(js|jsx)$/,
            include: path.join(__dirname, '../src'),
            loader: require.resolve('babel-loader'),
          },
          {
            test: /\.css$/,
            use: [
              require.resolve('style-loader'),
              {
                loader: require.resolve('css-loader'),
                options: {
                  importLoaders: 1,
                },
              },
              {
                loader: require.resolve('postcss-loader'),
                options: {
                  plugins: [
                    require('postcss-flexbugs-fixes'),
                    require('autoprefixer')({
                      browsers: [
                        'last 2 versions',
                        'Firefox ESR',
                        'not ie < 9',
                        'iOS > 8',
                        'Android >= 2',
                      ],
                      flexbox: 'no-2009',
                    }),
                    require('postcss-plugin-px2rem')({
                      rootValue: 100,
                      minPixelValue: 2,
                    }),
                  ],
                },
              },
            ],
          },
          {
            test: /\.less$/,
            exclude: /node_modules/,
            use: [
              require.resolve('style-loader'),
              {
                loader: require.resolve('css-loader'),
                options: {
                  modules: true,
                  importLoaders: 1,
                  localIdentName: '[name]_[local]-[hash:base64:5]',
                },
              },
              {
                loader: require.resolve('postcss-loader'),
                options: {
                  ident: 'postcss',
                  plugins: [
                    require('postcss-flexbugs-fixes'),
                    require('autoprefixer')({
                      browsers: [
                        'last 2 versions',
                        'Firefox ESR',
                        'not ie < 9',
                        'iOS > 8',
                        'Android >= 2',
                      ],
                      flexbox: 'no-2009',
                    }),
                    require('postcss-plugin-px2rem')({
                      rootValue: 100,
                      minPixelValue: 2,
                    }),
                  ],
                },
              },
              require.resolve('less-loader'),
            ],
          },
          {
            test: /\.less$/,
            exclude: path.join(__dirname, '../src'),
            use: [
              require.resolve('style-loader'),
              {
                loader: require.resolve('css-loader'),
                options: {
                  importLoaders: 1,
                },
              },
              {
                loader: require.resolve('postcss-loader'),
                options: {
                  ident: 'postcss',
                  plugins: [
                    require('postcss-flexbugs-fixes'),
                    require('autoprefixer')({
                      browsers: [
                        'last 2 versions',
                        'Firefox ESR',
                        'not ie < 9',
                        'iOS > 8',
                        'Android >= 2',
                      ],
                      flexbox: 'no-2009',
                    }),
                    require('postcss-plugin-px2rem')({
                      rootValue: 100,
                      minPixelValue: 2,
                    }),
                  ],
                },
              },
              {
                loader: require.resolve('less-loader'),
                options: {
                  javascriptEnabled: true,
                  modifyVars: { '@hd': '2px' },
                },
              },
            ],
          },
          {
            exclude: [/\.(js|jsx)$/, /\.html$/, /\.json$/],
            loader: require.resolve('file-loader'),
            options: {
              name: 'media/[name].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(__dirname, '../src/pages/index.html'),
      filename: path.resolve(`${__dirname}/../dist`, 'index.html'),
      chunks: ['_hd'],
      PAGES: pagesConfig,
    }),
  ].concat(
    pagesConfig.map(config => {
      return new HtmlWebpackPlugin({
        inject: true,
        template: config.document,
        filename: path.resolve(
          `${__dirname}/../dist/${config.name}`,
          'index.html',
        ),
        chunks: ['_hd', config.name],
      })
    }),
  ),
}
