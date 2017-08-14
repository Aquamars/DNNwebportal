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
* for development, run dev-server
* open localhost:8080

```
npm run dll
npm run app
```
* package dll(bundle.js) and app(app.js)
* the files will generate in build folder

|#|command|generate|
| - | --------- | ------------ |
| 1 |npm run dll|`bundle.js`,`bundle.js.gz`,`bundle.manifest.json`,`report.dll.html`,`stats.dll.json`|
| 2 |npm run app|`app.js`,`app.js.gz`,`report.app.html`,`stats.app.json`,`index.html`,`main.css`,`/image`,`/locales`,`/res`|
| 3 |npm start  |`stats.dev.json`|

```
npm run build
```
* package all (dll and app)
* the files will generate in build folder

## Develop With
* [Reactjs](https://facebook.github.io/react/)
* [Babel](https://babeljs.io/)
* [Redux](https://github.com/reactjs/redux)
* [material-ui](http://www.material-ui.com/)

## Built With

* [Webpack](https://github.com/webpack/webpack) - module bundler
	* [UglifyJS](https://github.com/webpack-contrib/uglifyjs-webpack-plugin) - minify JavaScript
	* [Compression](https://github.com/webpack-contrib/compression-webpack-plugin) - compressed static assets
	* [HappyPack](https://github.com/amireh/happypack) - allowing you to transform multiple files in parallel
	* [DllPlugin](https://webpack.js.org/plugins/dll-plugin/) - split bundles

## Package Analysis ##
------
###report.app.html
* State size: 601.18KB
* Parse size: 294.85KB
* Gzipped size: 92.8KB
![alt text](/build/image/app.PNG "app.js")

###report.dll.html
* State size: 5.19MB
* Parse size: 2.17MB
* Gzipped size: 532.58KB
![alt text](/build/image/dll.PNG "dll.js")

### other Analysis tools
* put JSON file( `stats.dev.json` , `stats.app.json` , `stats.dll.json` ) on these website
	* analyse - https://github.com/webpack/analyse
	* webpack-visualizer - https://chrisbateman.github.io/webpack-visualizer/

## Contribution guidelines ##
------
* A40503
* Kevin Huang
* Yenhsuan

### Who do I talk to? ###
------
* me or my boss, perhaps.