const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { merge } = require('webpack-merge');
const base = require('./webpack.config');

const dev = {
  mode: 'development',
  entry: [path.resolve('src', 'index.js')],
  output: {
    path: path.resolve('dist'),
    publicPath: '/',
    filename: 'static/js/[name].js',
    chunkFilename: 'static/js/[name].min.js',
  },
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    compress: true,
    hot: true,
    historyApiFallback: true,
    host: '0.0.0.0',
    allowedHosts: 'all',
    port: 3000,
    static: {
      publicPath: './dist',
    },
    devMiddleware: {
      publicPath: '/',
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      inject: true,
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
};

module.exports = merge(base, dev);
