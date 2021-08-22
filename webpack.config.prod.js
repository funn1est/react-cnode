const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
// const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { merge } = require('webpack-merge');
const base = require('./webpack.config');

const prod = {
  mode: 'production',
  entry: {
    app: [path.resolve('src', 'index.js')],
    vendor: [
      'react',
      'react-dom',
      'react-router-dom',
      'axios',
      'moment',
      'immutable',
      'react-redux',
      'redux',
      'redux-actions',
      'redux-immutable',
      'react-simplemde-editor',
    ],
  },
  output: {
    path: path.resolve('dist'),
    publicPath: '/',
    filename: 'static/js/[name].[chunkhash:8].js',
    chunkFilename: 'static/js/[name].[chunkhash:8].min.js',
  },
  optimization: {
    minimize: true,
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
      name: (entrypoint) => `runtime-${entrypoint.name}`,
    },
  },
  plugins: [
    new webpack.HashedModuleIdsPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn/),
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
    new WebpackManifestPlugin({
      fileName: 'asset-manifest.json',
    }),
    // new SWPrecacheWebpackPlugin({
    //   dontCacheBustUrlsMatching: /\.\w{8}\./,
    //   filename: 'service-worker.js',
    //   minify: true,
    //   navigateFallback: '/index.html',
    //   navigateFallbackWhitelist: [/^(?!\/__).*/],
    //   staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/],
    // }),
    new CleanWebpackPlugin({
      verbose: true,
    }),
    // new BundleAnalyzerPlugin(),
  ],
};

module.exports = merge(base, prod);
