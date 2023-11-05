const { merge } = require('webpack-merge')
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')

const webpack = require('webpack')

const commonConfig = require('./webpack.common')
const packageJson = require('../package.json')

const dotenv = require('dotenv').config()

const prodConfig = {
  mode: 'production',
  output: {
    filename: '[name].[contenthash].js',
    publicPath: '/auth/latest/',
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
    })
  ],
}

module.exports = merge(commonConfig, prodConfig)

// git commit control 7
