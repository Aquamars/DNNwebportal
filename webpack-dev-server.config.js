const webpack = require('webpack');
const path = require('path');
const buildPath = path.resolve(__dirname, 'build');
const nodeModulesPath = path.resolve(__dirname, 'node_modules');
const TransferWebpackPlugin = require('transfer-webpack-plugin');
const CompressionPlugin = require("compression-webpack-plugin");
const HappyPack = require('happypack');
const os = require('os');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })
console.log('buildPath:' + buildPath)
const config = {
  // context: path.join(__dirname, '/src/app/app.js'),
  // Entry points to the project
  entry:{
    //'webpack/hot/dev-server',
    //'webpack/hot/only-dev-server',
    'app':[
        'react-hot-loader/patch',
        'babel-polyfill',
         path.join(__dirname, '/src/app/app.js'),
	      'webpack/hot/only-dev-server',    
    ]
  },
  // Server Configuration options
  devServer: {
    // contentBase: 'src/www',
    contentBase: 'build', // Relative directory for base of server
    disableHostCheck: true,
    hot: true, // Live-reload
    inline: true,
    port: 8080, // Port Number
    // host: '140.96.29.77', // Change to '0.0.0.0' for external facing server
    host: '0.0.0.0',
  },
  devtool: 'eval',
  output: {
    path: buildPath, // Path of output file
    filename: 'app.js',
    library: 'bundle_dll'
  },
  plugins: [

    new webpack.DllReferencePlugin({
      // An absolute path of your application source code
      context: buildPath,
      // The path to the generated vendor-manifest file
      manifest: require(path.join(__dirname, './build/bundle.manifest.json')),
      // name: './build/bundle.js'
    }),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      comments: false,
      compress: {
        warnings: false,
        drop_console: true,
        collapse_vars: true,
        reduce_vars: true,
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    // Enables Hot Modules Replacement
    // new webpack.HotModuleReplacementPlugin(),
    // prints more readable module names in the browser console on HMR updates
    new webpack.NamedModulesPlugin(),
    // Allows error warnings but does not stop compiling.
    new webpack.NoEmitOnErrorsPlugin(),
    // Moves files
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
      { 
        test: /\.less/,
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
