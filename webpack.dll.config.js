const webpack = require('webpack');
const path = require('path');
const buildPath = path.resolve(__dirname, 'build');
const CompressionPlugin = require("compression-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const HappyPack = require('happypack');
const os = require('os');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
module.exports = {
    entry: {
        bundle: [
          'react',
          'react-dom',
          'react-ga',
          'react-chartjs2',
          'react-chartjs-2',
          'react-i18next',
          'react-grid-layout',
          'react-day-picker',
          'react-tooltip',
          'react-tap-event-plugin',
          'react-notification-system',
          'react-copy-to-clipboard',
          'react-virtualized-select',
          'react-table',
          'react-table/react-table.css',
          "react-redux",
          "redux",
          "redux-logger",
          "redux-promise",
          "redux-thunk",
          'axios', 
          'material-ui',
          'moment',
          'chart.js',
          'papaparse',
          'rc-progress',
          'i18next',
          'i18next-browser-languagedetector',
          'i18next-xhr-backend',          
          'crypto-js',
          'semantic-ui-css/components/label.min.css',
          'semantic-ui-react',
        ],
        // pdf
        bundle2:[
          'jspdf',
          'pdfmake/build/pdfmake.js',        
        ],
        // image
        bundle3:[
          './src/app/image',
          './src/app/image/imageBase64'
        ],
        // fonts
        bundle4:[
          './src/app/plugin/font/vfs_fonts.js'
        ]
    },
    output: {
        path: buildPath,
        filename: '[name].js',
        library: '[name]'
    },
    plugins: [
        new webpack.DefinePlugin({
          'process.env': {
            NODE_ENV: JSON.stringify('production')
          }
        }),
        new webpack.DllPlugin({
          // The manifest we will use to reference the libraries
            path: './build/[name].manifest.json',
            name: '[name]',
            context: buildPath,
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
          analyzerMode: 'static',
          // Host that will be used in `server` mode to start HTTP server.
          analyzerHost: '127.0.0.1',
          // Port that will be used in `server` mode to start HTTP server.
          analyzerPort: 8888,
          // Path to bundle report file that will be generated in `static` mode.
          // Relative to bundles output directory.
          reportFilename: 'report.dll.html',
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
          statsFilename: 'stats.dll.json',
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
      }
    ],
  },
};