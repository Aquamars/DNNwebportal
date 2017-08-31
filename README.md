# DNN webportal #



## What is this repository for? ##
------
* This webportal for create instance to run DNN.
* Version 0.1.6

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
| 1 |npm run dll|`bundle.js`,`bundle.js.gz`,`bundle.manifest.json`,`bundle2.js`,`bundle2.js.gz`,`bundle2.manifest.json`,`bundle3.js`,`bundle3.js.gz`,`bundle3.manifest.json`,`bundle4.js`,`bundle4.js.gz`,`bundle4.manifest.json`,`report.dll.html`,`stats.dll.json`|
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
|app.js|688.76KB|309.34KB|80.15KB|

* app.js: kernal code of web
![alt text](/src/app/image/readme/app.PNG "app.js")

###report.dll.html
|js|State size|Parse size|Gzipped size|
| ---------| --------- | --------- | --------- |
|bundle.js|4.95 MB|1.7 MB|454.12 KB|
|bundle2.js|2.83 MB|1.08 MB|483.42 KB|
|bundle3.js|385.55 KB|386.05 KB|279.94 KB|
|bundle4.js|14.86 MB|14.86 MB|8.15 MB|
|All|23.02 MB|18.03 MB|9.34 MB|

* bundle.js: 3rd party modules
* bundle2.js: PDF modules
* bundle3.js: images
* bundle4.js: font

![alt text](/src/app/image/readme/dll.PNG "dll.js")

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

### Change log ###
------
last update 2017-08-23
* `0.1.9` loading status counting, auto refresh after loading 10s
* `0.1.8` add traditional chinese PDF 
* `0.1.7` change history table
* `0.1.6` add PDF tutorial
* `0.1.5` prototype