# DNN webportal #



### What is this repository for? ###

* This portal for create instance to run DNN.
* Version 0.1.5

### How do I get set up? ###
```
npm start
```
* for development
```
npm run dll
npm run app
```
* package dll(bundle.js) and app(app.js)
* the files will generate in build folder
|#|command|generate|
| - |:-------:| -----------:|
|1|npm run dll|<ul><li>bundle.js</li><li>bundle.js.gz</li><li>bundle.manifest.json</li><li>report.dll.html</li><li>stats.dll.json</li></ul>|
|2|npm run app|<ul><li>app.js</li><li>app.js.gz</li><li>report.app.html</li><li>stats.app.json</li><li>index.html</li><li>main.css</li><li>/image</li><li>/locales</li><li>/res</li></ul>|
|2|npm start|<ul><li>stats.dev.json</li></ul>|


```
npm run build
```
* package all (dll and app)
* the file will generate in build folder

### Contribution guidelines ###

* A40503
* Kevin Huang

### Who do I talk to? ###

* me or my boss, perhaps.