const webpack = require('webpack');
const path = require('path');
const buildPath = path.resolve(__dirname, 'build');
const nodeModulesPath = path.resolve(__dirname, 'node_modules');
const TransferWebpackPlugin = require('transfer-webpack-plugin');
const CompressionPlugin = require("compression-webpack-plugin");
const HappyPack = require('happypack');
const os = require('os');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })

const config = {
  entry: ['babel-polyfill',path.join(__dirname, '/src/app/app.js')],
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
      beautify: false,
      comments: false,
      compress: {
        // suppresses warnings, usually from module minification
        warnings: false,
        drop_console: true,
        collapse_vars: true,
        reduce_vars: true,
      }
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
    // using gzip
    new CompressionPlugin({
        asset: "[path].gz[query]",
        algorithm: "gzip",
        test: /\.(js|html)$/,
        threshold: 10240,
        minRatio: 0.8
    }),
    // transform multiple files in parallel
    new HappyPack({
      id: 'jsHappy',
      threadPool: happyThreadPool,
      loaders: [{
        path: 'babel-loader',
        query: {
          cacheDirectory: '.webpack_cache',
          presets: [
            'es2015',
            'react',
            'stage-0'
          ],
          plugins: ["transform-async-to-generator"]
        }
      }]
    }),
    new HappyPack({
      id: 'styleHappy',
      threadPool: happyThreadPool,
      loaders: ["style-loader","css-loader","less-loader","url-loader"]
    }),
    // new webpack.DllReferencePlugin({
    //   context: '.',
    //   manifest: buildPath+"/bundle.manifest.json",
    // }),
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
      },
      //image package
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: { limit: 40000 }
          },
          'image-webpack-loader'
        ]
      }
    ],
  },
};

module.exports = config;
