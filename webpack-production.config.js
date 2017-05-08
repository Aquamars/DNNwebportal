const webpack = require('webpack');
const path = require('path');
const buildPath = path.resolve(__dirname, 'build');
const nodeModulesPath = path.resolve(__dirname, 'node_modules');
const TransferWebpackPlugin = require('transfer-webpack-plugin');

const config = {
  entry: [path.join(__dirname, '/src/app/app.js')],
  // Render source-map file for final build
  devtool: 'source-map',
  // output config
  output: {
    path: buildPath, // Path of output file
    filename: 'app.js', // Name of output file
  },
  plugins: [
    // Define production build to allow React to strip out unnecessary checks
    new webpack.DefinePlugin({
      'process.env':{
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    // Minify the bundle
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        // suppresses warnings, usually from module minification
        warnings: false,
      },
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    // Allows error warnings but does not stop compiling.
    new webpack.NoEmitOnErrorsPlugin(),
    // Transfer Files
    new TransferWebpackPlugin([
      {from: 'www'},
    ], path.resolve(__dirname, 'src')),
    // Ingnore /moment/locale 
    new webpack.IgnorePlugin(/\.\/locale$/),
  ],
  module: {
    rules: [
      {
        test: /\.js$/, // All .js files
        use: [
       
          'babel-loader'
      
        ], // react-hot is like browser sync and babel loads jsx and es6-7
        exclude: /(node_modules)/,
      },
      { test: /\.less/,
        use: [
          
            "style-loader",
            "css-loader",
            "less-loader"
          
        ],
        exclude: /node_modules/ 
      },
      {
        test: /\.css$/,
        use: [
            'style-loader',
            'css-loader'          
        ],
      }
    ],
  },
};

module.exports = config;
