/**
 * Copies the html to the build folder
 */
var gulp    = require('gulp')
var changed = require('gulp-changed')
var watch   = require('gulp-watch')
var config  = require('../config')

var watching = false
gulp.task('html', function () {
  var task = gulp.src(config.html.src)
    .pipe(changed(config.html.dest)) // Ignore unchanged files
    .pipe(gulp.dest(config.html.dest))

  // Only watch in development
  if (config.env === 'development' && !watching) {
    watching = true
    watch(config.html.src, { verbose: true }, function () {
      gulp.start('html')
    })
  }

  return task
})
