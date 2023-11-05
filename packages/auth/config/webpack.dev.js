const { merge } = require('webpack-merge')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')

const commonConfig = require('./webpack.common')
const packageJson = require('../package.json')

const webpack = require('webpack')
const dotenv = require('dotenv').config()

const devConfig = {
  mode: 'development',
  output: {
    publicPath: 'http://localhost:3004/',
  },
  devServer: {
    port: 3004,
    historyApiFallback: {
      index: '/index.html',
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'auth',
      filename: 'remoteEntry.js',
      exposes: {
        './AuthApp': './src/bootstrap',
      },
      shared: packageJson.dependencies,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        REACT_APP_CLIENT_ID: JSON.stringify(process.env.REACT_APP_CLIENT_ID),
        REACT_APP_USER_POOL_ID: JSON.stringify(process.env.REACT_APP_USER_POOL_ID)
      }
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
}

module.exports = merge(commonConfig, devConfig)

// git commit control 2
