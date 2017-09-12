const path = require('path');
module.exports = {
	components: 'src/app/components/*.js',
	defaultExample: true,
	assetsDir: 'build/',
	webpackConfig: {
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
		}
	},
	require: ['babel-polyfill'],
	styleguideComponents: {
	    Wrapper: path.join(__dirname, './styleguide/Wrapper')
	},
	showUsage: true,
	title: 'DNN webportal Doc',
	// theme: {
	//     color: {
	//       sidebarBackground: '#2196F3',
	//       base: '#000',
	//       link: 'white',
	//       linkHover:'grey'
	//     },
	//   },
	// styles: {
	//   	logo: {
	//         color: 'yellow'
	//     }
	// }
	// resolver: require('react-docgen').resolver.findAllComponentDefinitions,
	// propsParser(filePath, source, resolver, handlers) {
	// 	console.log(filePath)
	//     return require('react-docgen').parse(source, resolver, handlers);
	// },
};