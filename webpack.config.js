const path = require('path');
const webpack = require('webpack');

// env
const buildDirectory = './dist/';

module.exports = {
  entry: [
    './client/index.jsx',
  ],
  devServer: {
    historyApiFallback: true,
    contentBase: './',
    inline: true,
  },
  eslint: {
    configFile: './.eslintrc',
  },
  output: {
    path: path.resolve(buildDirectory),
    filename: 'bundle.js',
    publicPath: 'http://localhost:8080/dist',
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /(node_modules|bower_components)/,
      loaders: ['babel-loader', 'eslint-loader'],
      // query: {
      //   presets: ['react', 'es2015', 'stage-0'],
      // },
    },
    {
      test: /\.js$/,
      loader: 'eslint-loader',
    },
    {
      test: /\.scss$/,
      loaders: ['style', 'css', 'sass'],
    }],
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  externals: {
    cheerio: 'window',
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true,
  },
};
