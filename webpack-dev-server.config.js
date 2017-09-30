const webpack = require('webpack');
const path = require('path');
const buildPath = path.resolve(__dirname, 'build');
const nodeModulesPath = path.resolve(__dirname, 'node_modules');
const TransferWebpackPlugin = require('transfer-webpack-plugin');
const CompressionPlugin = require("compression-webpack-plugin");
const HappyPack = require('happypack');
const os = require('os');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const NyanProgressPlugin = require('nyan-progress-webpack-plugin');
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
    compress: true, // enable gzip
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
    }),
    new webpack.DllReferencePlugin({
      // An absolute path of your application source code
      context: buildPath,
      // The path to the generated vendor-manifest file
      manifest: require(path.join(__dirname, './build/bundle2.manifest.json')),
    }),
    new webpack.DllReferencePlugin({
      // An absolute path of your application source code
      context: buildPath,
      // The path to the generated vendor-manifest file
      manifest: require(path.join(__dirname, './build/bundle3.manifest.json')),
    }),
    new webpack.DllReferencePlugin({
      // An absolute path of your application source code
      context: buildPath,
      // The path to the generated vendor-manifest file
      manifest: require(path.join(__dirname, './build/bundle4.manifest.json')),
    }),
    new NyanProgressPlugin({
      nyanCatSays (progress, messages) {
        if (progress === 1){
          return 'Engineer make bug, bug make engineer work.'
        }
      }
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
    new BundleAnalyzerPlugin({
      // Can be `server`, `static` or `disabled`.
      // In `server` mode analyzer will start HTTP server to show bundle report.
      // In `static` mode single HTML file with bundle report will be generated.
      // In `disabled` mode you can use this plugin to just generate Webpack Stats JSON file by setting `generateStatsFile` to `true`.
      analyzerMode: 'server',
      // Host that will be used in `server` mode to start HTTP server.
      analyzerHost: '127.0.0.1',
      // Port that will be used in `server` mode to start HTTP server.
      analyzerPort: 8888,
      // Path to bundle report file that will be generated in `static` mode.
      // Relative to bundles output directory.
      reportFilename: 'report.html',
      // Module sizes to show in report by default.
      // Should be one of `stat`, `parsed` or `gzip`.
      // See "Definitions" section for more information.
      defaultSizes: 'parsed',
      // Automatically open report in default browser
      openAnalyzer: false,
      // If `true`, Webpack Stats JSON file will be generated in bundles output directory
      generateStatsFile: true,
      // Name of Webpack Stats JSON file that will be generated if `generateStatsFile` is `true`.
      // Relative to bundles output directory.
      statsFilename: 'stats.dev.json',
      // Options for `stats.toJson()` method.
      // For example you can exclude sources of your modules from stats file with `source: false` option.
      // See more options here: https://github.com/webpack/webpack/blob/webpack-1/lib/Stats.js#L21
      statsOptions: null,
      // Log level. Can be 'info', 'warn', 'error' or 'silent'.
      logLevel: 'info'
    })
    
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
            {
              loader: 'css-loader',
              options: { url: false }
            },
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
      },
      // { test: /\.ttf$/i,
      //   loader: 'null-loader',
      // },
    ],
  },
};

module.exports = config;
