# cordova-starter

Starter-kit for Cordova applications to streamline the process for creating POCs on Android.

You must have [Node.js](https://nodejs.org/en/) installed on your system. 
The demo will be run off the Samsung Galaxy Tab S2 (9.7 inch) that we have lying around the offices, as such, ensure your machine is set up to support development of Cordova apps for Android devices. Refer to [Cordova documentation](https://cordova.apache.org/docs/en/latest/guide/platforms/android/index.html) for requirements.

Note that if you require multiple versions of Cordova on your development machine, consider utilising [local-cordova](https://www.npmjs.com/package/local-cordova), which will search for a locally installed cordova CLI. Install it via:

```
npm install local-cordova -g
```

## Local development

All source files can be found in the `src` folder. The project's build process is handled by [gulp.js](https://gulpjs.com/), which is responsible for the following tasks:

- Running browsersync, which works as a server and handles hot-reloading
- Compiling `.scss` files into `.css`
- Transpiling ES6 with [Babel](https://babeljs.io/)
- Rendering [Nunjucks](https://mozilla.github.io/nunjucks/) templates into `.html`

Styles are written in `.scss` and can be found in `src/scss`.

Javascript is written using ES6 syntax and can be found in `src/js`. Because this is a Cordova app run locally, we have chosen not to implement typical Javascript optimisation practices, and are loading each page's functionalities in their respective Javascript files instead.

Nunjucks is the templating engine, and allows for conveniences like conditional logic, loops, variables and includes. Please refer to [official documentation](https://mozilla.github.io/nunjucks/templating.html) for more details.

Images are directly placed in the `www/img` folder.

Once repository is cloned, run `yarn install` or `npm install` (depending on your package manager of choice), to install all required dependencies. After which, run `gulp`, to start the local development server.

Before you can deploy the application on a device, you have to add a platform to the project by running:

```
cordova platform add android
```

## Run project on test device

```
cordova run android --device –debug
```

## Run project on emulator

```
cordova emulate android
```

## Build project

```
cordova build android
```

## To release APK via Cordova

Follow marked answer on this SO post: [How to create a signed APK file using Cordova command line interface?
](https://stackoverflow.com/questions/26449512/how-to-create-a-signed-apk-file-using-cordova-command-line-interface)
