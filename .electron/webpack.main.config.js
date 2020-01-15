process.env.BABEL_ENV = 'main';

const path = require('path');
const { dependencies } = require('../package.json');
const webpack = require('webpack');

const TerserPlugin = require('terser-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';

let mainConfig = {
  entry: {
    main: path.join(__dirname, '../src/main/index.js')
  },
  devtool: isProduction ? 'none' : 'source-map',
  externals: [...Object.keys(dependencies || {})],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.node$/,
        use: 'node-loader'
      }
    ]
  },
  node: {
    __dirname: process.env.NODE_ENV !== 'production',
    __filename: process.env.NODE_ENV !== 'production'
  },
  output: {
    filename: '[name].js',
    libraryTarget: 'commonjs2',
    path: path.join(__dirname, '../build/electron')
  },
  plugins: [new webpack.NoEmitOnErrorsPlugin()],
  optimization: {
    minimizer: []
  },
  resolve: {
    extensions: ['.js', '.json', '.node']
  },
  target: 'electron-main'
};

/**
 * Adjust mainConfig for development settings
 */
if (!isProduction) {
  mainConfig.plugins.push(
    new webpack.DefinePlugin({
      __static: `"${path.join(__dirname, '../static').replace(/\\/g, '\\\\')}"`
    })
  );
}

/**
 * Adjust mainConfig for production settings
 */
if (isProduction) {
                    mainConfig.plugins.push(
                      new webpack.DefinePlugin({
                        'process.env.NODE_ENV': '"production"'
                      })
                    );
                    // const terserOptions = require('./terserOptions');
                    // mainConfig.optimization.minimizer.push(new TerserPlugin(terserOptions()));
                  }

module.exports = mainConfig;
