const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const base = require('./webpack.config');

const dev = {
  mode: 'development',
  entry: [
    path.resolve('src', 'index.js'),
  ],
  output: {
    path: path.resolve('dist'),
    publicPath: '/',
    filename: 'static/js/[name].js',
    chunkFilename: 'static/js/[name].min.js',
  },
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: './dist',
    publicPath: '/',
    inline: true,
    hot: true,
    historyApiFallback: true,
    host: '0.0.0.0',
    disableHostCheck: true,
    port: 3000,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject: true,
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
};

module.exports = merge(base, dev);
