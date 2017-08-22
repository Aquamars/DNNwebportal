# DNN webportal #



## What is this repository for? ##
------
* This webportal for create instance to run DNN.
* Version 0.1.5

## How do I get set up? ##
------
```
npm install
```
* for install modules

```
npm start
```
* need `npm run build` in first
* for development, run dev-server
* open 'localhost:8080' on browser

```
npm run dll
npm run app
```
* package dll(bundle.js,bundle2.js,bundle3.js) and app(app.js)
* the files will generate in build folder

|#|command|generate|
| - | --------- | ------------ |
| 1 |npm run dll|`bundle.js`,`bundle.js.gz`,`bundle.manifest.json`,`bundle2.js`,`bundle2.js.gz`,`bundle2.manifest.json`,`bundle3.js`,`bundle3.js.gz`,`bundle3.manifest.json`,`report.dll.html`,`stats.dll.json`|
| 2 |npm run app|`app.js`,`app.js.gz`,`report.app.html`,`stats.app.json`,`index.html`,`main.css`,`/image`,`/locales`,`/res`|
| 3 |npm start  |`stats.dev.json`|

```
npm run build
```
* package all (dll and app)
* the files will generate in build folder

## Built With (major)
* [Reactjs](https://facebook.github.io/react/)
* [Babel](https://babeljs.io/)
* [Redux](https://github.com/reactjs/redux)
* [material-ui](http://www.material-ui.com/)
* [pdfmake](http://pdfmake.org)

## Package With
* [Webpack](https://github.com/webpack/webpack) - module bundler
	* [UglifyJS](https://github.com/webpack-contrib/uglifyjs-webpack-plugin) - minify JavaScript
	* [Compression](https://github.com/webpack-contrib/compression-webpack-plugin) - compressed static assets
	* [HappyPack](https://github.com/amireh/happypack) - allowing you to transform multiple files in parallel
	* [DllPlugin](https://webpack.js.org/plugins/dll-plugin/) - split bundles

## Package Analysis ##
------
###report.app.html
|js|State size|Parse size|Gzipped size|
| --- | --------- | --------- | --------- |
|app.js|661.46KB|291.49KB|74.51KB|

* app.js: kernal code of web
![alt text](/build/image/app.PNG "app.js")

###report.dll.html
|js|State size|Parse size|Gzipped size|
| ---------| --------- | --------- | --------- |
|bundle.js|4.67 MB|1.66 MB|443.5 KB|
|bundle2.js|3.74 MB|1.99 MB|958.52 KB|
|bundle3.js|347.56 KB|348.05 KB|252.71 KB|
|All|8.76 MB|3.99 MB|1.62 MB|

* bundle.js: 3rd party modules
* bundle2.js: PDF modules
* bundle3.js: images

![alt text](/build/image/dll.PNG "dll.js")

### other Analysis tools
* put JSON file( `stats.dev.json` , `stats.app.json` , `stats.dll.json` ) on these website
	* analyse - https://github.com/webpack/analyse
	* webpack-visualizer - https://chrisbateman.github.io/webpack-visualizer/
	* webpack-chart - https://alexkuz.github.io/webpack-chart/

## Contribution guidelines ##
------
* A40503
* Kevin Huang
* Yenhsuan

### Who do I talk to? ###
------
* Me or my boss, perhaps.

last update 2017-08-22