const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const merge = require('webpack-merge');
const base = require('./webpack.config');

const prod = {
  mode: 'production',
  entry: {
    app: [
      path.resolve('src', 'index.js'),
    ],
    vendor: [
      'react', 'react-dom', 'react-router-dom',
    ],
  },
  output: {
    path: path.resolve('dist'),
    publicPath: 'dataJs/',
    filename: '[name].[chunkhash:8].js',
    chunkFilename: '[name].[chunkhash:8].min.js',
  },
  optimization: {
    splitChunks: {
      minChunks: 2,
    },
    runtimeChunk: {
      name: 'manifest',
    },
  },
  plugins: [
    new webpack.HashedModuleIdsPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
      },
    }),
    new CleanWebpackPlugin(['dist'], {
      root: '',
      verbose: true,
      dry: false,
    }),
    new BundleAnalyzerPlugin(),
  ],
};

module.exports = merge(base, prod);
