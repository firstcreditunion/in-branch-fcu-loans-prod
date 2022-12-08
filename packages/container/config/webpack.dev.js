const { merge } = require('webpack-merge')
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')

const commonConfig = require('./webpack.common')
const packageJson = require('../package.json')

const devConfig = {
  mode: 'development',
  output: {
    publicPath: 'http://localhost:3001/',
  },
  devServer: {
    port: 3001,
    historyApiFallback: {
      index: '/index.html',
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'firstloan',
      filename: 'remoteEntry.js',
      remotes: {
        auth: 'auth@http://localhost:3004/remoteEntry.js',
        loanCalculator: 'loanCalculator@http://localhost:3003/remoteEntry.js',
        application: 'application@http://localhost:3000/remoteEntry.js',
      },
      shared: packageJson.dependencies,
    }),
  ],
}

module.exports = merge(commonConfig, devConfig)
// git commit control 2
