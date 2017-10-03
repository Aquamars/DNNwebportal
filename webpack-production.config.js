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
      debounceInterval: 60,
      nyanCatSays (progress, messages) {
        if (progress === 1){
          const msg = [
            'Programmer make bug and bug make Programmer work.',
            'Programmer - A machine that turns coffee into code.',
            "What is a programmer's favourite hangout place? Ans: Foo bar",
            'Real programmers count from 0',
            'There’s no place like 127.0.0.1',
            'There are only 10 kinds of people: those who know binary and those who don’t.'
          ]
          const x = Math.floor((Math.random() * (msg.length - 1)) + 1);
          return msg[x];
        }
      }
    }),
    new BundleAnalyzerPlugin({
      // Can be `server`, `static` or `disabled`.
      // In `server` mode analyzer will start HTTP server to show bundle report.
      // In `static` mode single HTML file with bundle report will be generated.
      // In `disabled` mode you can use this plugin to just generate Webpack Stats JSON file by setting `generateStatsFile` to `true`.
      analyzerMode: 'static',
      // Host that will be used in `server` mode to start HTTP server.
      analyzerHost: '127.0.0.1',
      // Port that will be used in `server` mode to start HTTP server.
      analyzerPort: 8888,
      // Path to bundle report file that will be generated in `static` mode.
      // Relative to bundles output directory.
      reportFilename: 'report.app.html',
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
      statsFilename: 'stats.app.json',
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
      }
    ],
  },
};

module.exports = config;
