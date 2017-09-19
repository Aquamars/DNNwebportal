# DNN webportal #



## What is this repository for? ##
------
* This webportal for creating instance to run DNN.
* Version 0.2.7

![alt text](/src/app/image/readme/DNNweb.gif "DNN web")

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

```
npm run styleguide
```
* The compnent document
* open 'localhost:6060' on browser
![alt text](/src/app/image/readme/DNNdoc.gif "DNN doc")

|#|command|generate|
| - | ----------- | ------------ |
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
* [React Styleguidist](https://react-styleguidist.js.org/)
* [react-ga](https://github.com/react-ga/react-ga)

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
|app.js|616.52KB|281.66KB|70.5KB|

* app.js: kernal code of web
![alt text](/src/app/image/readme/app.PNG "app.js")

###report.dll.html
|js|State size|Parse size|Gzipped size|
| ---------| --------- | --------- | --------- |
|bundle.js|5.03 MB|1.76 MB|460.24 KB|
|bundle2.js|2.83 MB|1.08 MB|483.42 KB|
|bundle3.js|753.74 KB|754.66 KB|531.784 KB|
|bundle4.js|14.86 MB|14.86 MB|8.15 MB|
|All|23.46 MB|18.45 MB|9.59 MB|

* bundle.js: 3rd party modules
* bundle2.js: PDF modules
* bundle3.js: images (with base64)
* bundle4.js: font

![alt text](/src/app/image/readme/dll.PNG "dll.js")

### other Analysis tools
* put JSON file( `stats.dev.json` , `stats.app.json` , `stats.dll.json` ) on these website
	* analyse - https://github.com/webpack/analyse
	* webpack-visualizer - https://chrisbateman.github.io/webpack-visualizer/
	* webpack-chart - https://alexkuz.github.io/webpack-chart/

## Google analytics Event data ##
------
### Anatomy of Events

Category -> Action -> Label -> Value
https://support.google.com/analytics/answer/1033068?hl=en

### webportal events

```
{
  createPage:{
  	selectImage:["All", "Tensorflow", "Caffe", "Torch"],
  	Open:null,
  	Close:null,
  	selectStartDate:["..."],
  	selectEndDate:["..."],
  	createSchedule:["Success"]
  },
  pageView:{
    "Access Web":null
  },
  DetailModal:{
    Open:null,
  	Close:null
  },
  DeleteModal:{
    Open:["1", "5", "12"],
  	Close:["1", "5", "12"],
  	Deleted:["1", "5", "12"]
  },
  EditModal:{
    Open:["1", "5", "12"],
  	Close:["1", "5", "12"],
  	"Select Date":["1", "5", "12"],
  	Edited:["1", "5", "12"]
  },
  HistoryTable:{
    Open:null,
  	Close:null
  },
  Notify:{
    Error:["ERROR : Extend Date", "ERROR : ReviewTable"],
    Copy:["Password", "Port", "sshCMD", "Account", "Ip"]
  },
  FtpInfoModal:{
    Open:null,
  	Close:null
  },
  SignIn:{
    Success:["A40503"],
    Fail:["A40503"]
  },
  ReviewTable:{
    Refresh:null
  },
  PDF:{
    Open:["Eng","Tc"]
  },
  Language:{
    Switch:["Eng","Tw"]
  },
  SignOut:{
    Success:["A40503"]
  },
  Outbound:{
    Click:["SSHweb"]
  }
}
```

## Docker Image ##
------
### Using the Image ###

* `TAG` is dnnweb version

```
docker pull 100.86.2.10:32190/dnnweb:TAG
```

### Building the Image ###

* need `npm run build` in first
```
cd docker
docker build -t dnnweb .
```

### Change API from container ###

`
docker exec dnnweb sh /dnnwebportal/changeAPI <your IP with http or https> <port>
`

example :

```
docker exec dnnweb sh /dnnwebportal/changeAPI http://127.0.0.1 9527
```

### Change SSHweb from container ###

`
docker exec dnnweb sh /dnnwebportal/changeSSH <your IP with http or https> <port>
`

example :

```
docker exec dnnweb sh /dnnwebportal/changeSSH http://127.0.0.1 5566
```

### Change FTP from container ###

`
docker exec dnnweb sh /dnnwebportal/changeFTP <your host> <port>
`

example :

```
docker exec dnnweb sh /dnnwebportal/changeFTP 127.0.0.1 9487
```

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
last update 2017-09-19

* `0.2.7`  add finishAutoPage, limitDay hints
* `0.2.6`  add shellScript for changeFTP, changeSSH
* `0.2.5`  add shellScript for changeAPI
* `0.2.4`  add Dockerfile
* `0.2.3`  add animate hint
* `0.2.2`  add counting time on sshWebBtn
* `0.2.1`  add sshWeb on reviewTable
* `0.2.0`  change new API
* `0.1.14` add styleguid
* `0.1.13` add comment on proptype of compnents
* `0.1.12` add base64 image
* `0.1.11` add GA
* `0.1.10` add sshWeb
* `0.1.9`  loading status counting, auto refresh after loading 10s
* `0.1.8`  add traditional chinese PDF 
* `0.1.7`  change history table
* `0.1.6`  add PDF tutorial
* `0.1.5`  prototype