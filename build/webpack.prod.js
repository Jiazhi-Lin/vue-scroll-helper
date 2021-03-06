const merge = require('webpack-merge')
const webpack = require('webpack')
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")
const UglifyJsPlugin = require("uglifyjs-webpack-plugin")
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
  output: {
    libraryTarget: 'umd'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.HashedModuleIdsPlugin()
  ],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        sourceMap: false
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  }
})
