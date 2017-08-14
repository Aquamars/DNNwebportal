# DNN webportal #



### What is this repository for? ###
------
* This portal for create instance to run DNN.
* Version 0.1.5

### How do I get set up? ###
------
```
npm start
```
* for development, run dev-server

```
npm run dll
npm run app
```
* package dll(bundle.js) and app(app.js)
* the files will generate in build folder

|#|command|generate|
| - |:---------:| ----------- |
| 1 |npm run dll|bundle.js<br/>bundle.js.gz<br/>bundle.manifest.json<br/>report.dll.html<br/>stats.dll.json<br/>|
| 2 |npm run app|app.js<br/>app.js.gz<br/>report.app.html<br/>stats.app.json<br/>index.html<br/>main.css<br/>/image<br/>/locales<br/>/res<|
| 3 |npm start  |stats.dev.json<|

```
npm run build
```
* package all (dll and app)
* the files will generate in build folder

### Package Analysis ###
------



### Contribution guidelines ###
------
* A40503
* Kevin Huang

### Who do I talk to? ###
------
* me or my boss, perhaps.