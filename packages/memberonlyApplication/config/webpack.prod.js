const { merge } = require('webpack-merge')
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')

const commonConfig = require('./webpack.common')
const packageJson = require('../package.json')

const prodConfig = {
  mode: 'production',
  output: {
    filename: '[name].[contenthash].js',
    publicPath: '/memberonlyApplication/latest/',
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'memberonlyapplication',
      filename: 'remoteEntry.js',
      exposes: {
        './MemberOnlyApplicationApp': './src/bootstrap',
      },
      shared: packageJson.dependencies,
    }),
  ],
}

module.exports = merge(commonConfig, prodConfig)

// git commit control 7
