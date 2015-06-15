var config = require('../config')
var gulp = require('gulp')
var gulpSequence = require('gulp-sequence')

gulp.task('build', function (cb) {
  var tasks = ['clean', 'images', 'fonts', ['sass', 'webpack']]

  tasks.push(cb)
  gulpSequence.apply(this, tasks)
})
