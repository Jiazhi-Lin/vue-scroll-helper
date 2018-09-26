var path = require('path')
var webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")
const CleanWebpackPlugin = require('clean-webpack-plugin')
const EslintFriendlyFormatter = require('eslint-friendly-formatter')

const isDev = process.env.NODE_ENV !== 'production'
console.log(`当前node环境为：${process.env.NODE_ENV}`)

module.exports = {
  entry: path.join(__dirname, '../lib/vue-scroll-helper'),
  output: {
    path: path.resolve(__dirname, '../dist/'),
    filename: 'index.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        enforce: "pre",
        test: /\.(jsx?|vue)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'eslint-loader',
            options: {
              formatter: EslintFriendlyFormatter
            }
          }
        ]
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|svga?|jpg|gif|mp3|mp4|wma)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1000,
              fallback: 'file-loader',
              name: '[name].[ext]?[hash]'
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.vue', '.scss', '.css', '.json']
  },
  plugins: [
    // new CleanWebpackPlugin(['dist'], {
    //   root: path.join(__dirname, '../')
    // }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new VueLoaderPlugin()
  ]
}
