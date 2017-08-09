const webpack = require('webpack');
const path = require('path');
const buildPath = path.resolve(__dirname, 'build');
const CompressionPlugin = require("compression-webpack-plugin");
module.exports = {
    entry: {
        bundle: [
          'react',
          'react-dom',
          'material-ui',
          'react-chartjs2',
          'react-chartjs-2',
          'react-i18next',
          'react-grid-layout',
          'axios',
          'react-tooltip',
          'moment',
          'chart.js',
          'react-notification-system',
          'react-copy-to-clipboard',
          'papaparse',
          'i18next',
          'i18next-browser-languagedetector',
          'i18next-xhr-backend',
          'react-virtualized-select',
          'crypto-js',
          'semantic-ui-css/semantic.min.css',
          'semantic-ui-react'

        ],
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
            path: './build/bundle.manifest.json',
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