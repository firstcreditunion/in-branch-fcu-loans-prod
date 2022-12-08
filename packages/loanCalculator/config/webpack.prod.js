const { merge } = require('webpack-merge')
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')

const commonConfig = require('./webpack.common')
const packageJson = require('../package.json')

const prodConfig = {
  mode: 'production',
  output: {
    filename: '[name].[contenthash].js',
    publicPath: '/loanCalculator/latest/',
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'loanCalculator',
      filename: 'remoteEntry.js',
      exposes: {
        './LoanCalculatorApp': './src/bootstrap',
      },
      shared: packageJson.dependencies,
    }),
  ],
}

module.exports = merge(commonConfig, prodConfig)

// git commit control 7
