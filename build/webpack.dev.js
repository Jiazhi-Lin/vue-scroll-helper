const webpack = require('webpack')
const merge = require('webpack-merge')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const common = require('./webpack.common.js')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  resolve: {
    alias: {
      '@': path.join(__dirname, '../src')
    }
  },
  entry: path.join(__dirname, '../src/index.js'),
  devServer: {
    contentBase: path.join(__dirname, '../dist'),
    hot: true,
    open: true,
    quiet: true,
    port: 9999,
    watchOptions: {
      poll: false
    }
  },
  externals: {
    vue: 'Vue'
  },
  plugins: [
    new FriendlyErrorsPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(__dirname, '../src/html/index.html')
    })
  ]
})
