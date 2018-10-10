const gulp        = require('gulp')
const browserSync = require('browser-sync')
const sass        = require('gulp-sass')
const prefix      = require('gulp-autoprefixer')
const cssnano     = require('gulp-cssnano')
const concat      = require('gulp-concat')
const uglify      = require('gulp-uglify')
const babel       = require('gulp-babel')
const render      = require('gulp-nunjucks-render')

/**
 * Launch the Server
 */
const startServer = (done) => {
  browserSync.init({
    server: "www",
    port: 2703
  })
  done()
}

/**
 * Compile files from scss
 */
const compileStyles = () => {
  return gulp.src('src/scss/styles.scss')
  .pipe(sass({
    includePaths: ['scss'],
    onError: browserSync.notify
  }))
  .pipe(prefix(['last 3 versions', '> 3%'], { cascade: true }))
  .pipe(gulp.dest('www/css'))
  .pipe(browserSync.reload({ stream:true }))
}

/**
 * Compile files from js
 */
const compileScripts = () => { 
  return gulp.src(['src/js/*.js'])
  .pipe(babel({
    "presets": [ "@babel/preset-env" ]
  }))
  .pipe(concat('scripts.js'))
  .pipe(gulp.dest('www/js'))
  .pipe(browserSync.reload({ stream:true }))
}

/**
 * Reload page when html changes
 */
const compileMarkup = () => {
  return gulp.src('src/pages/**/*.+(njk)')
  .pipe(render({
      path: ['src/templates']
    }))
  .pipe(gulp.dest('www'))
  .pipe(browserSync.reload({ stream:true }))
}

/**
 * Watch scss files for changes & recompile
 * Watch js files for changes & concatenate
 * Watch nunjucks files, reload BrowserSync
 */
const watchMarkup = () => {
  gulp.watch(['src/pages/**/*.+(njk)', 'src/templates/**/*.+(njk)'], compileMarkup);
}

const watchScripts = () => {
  gulp.watch(['src/js/*.js'], compileScripts);
}

const watchStyles = () => { 
  gulp.watch(['src/scss/**/*.scss'], compileStyles)
}

/**
 * Compile the everything, launch BrowserSync & watch files.
 */
const compile = gulp.parallel(compileScripts, compileStyles, compileMarkup)
compile.description = 'compile all sources'

// Not exposed to CLI
const serve = gulp.series(compile, startServer)
serve.description = 'serve compiled source on local server at port 6950'

const watch = gulp.parallel(watchMarkup, watchScripts, watchStyles)
watch.description = 'watch for changes to all source'

/**
 * Default task, running just `gulp` will compile the sass,
 * compile the scripts, launch BrowserSync & watch files.
 */
const defaultTasks = gulp.parallel(serve, watch)

export {
  compile,
  compileScripts,
  compileStyles,
  compileMarkup,
  serve,
  watch,
  watchMarkup,
  watchScripts,
  watchStyles,
}

export default defaultTasks