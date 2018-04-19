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
      'react',
      'react-dom',
      'react-router-dom',
      'axios',
      'moment',
      'react-redux',
      'redux',
      'redux-actions',
    ],
  },
  output: {
    path: path.resolve('dist'),
    publicPath: '/',
    filename: '[name].[chunkhash:8].js',
    chunkFilename: '[name].[chunkhash:8].min.js',
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: 'initial',
          name: 'vendor',
          test: 'vendor',
          enforce: true,
        },
      },
    },
    runtimeChunk: {
      name: 'manifest',
    },
  },
  plugins: [
    new webpack.HashedModuleIdsPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.ContextReplacementPlugin(
      /moment[/\\]locale$/,
      /zh-cn/,
    ),
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
