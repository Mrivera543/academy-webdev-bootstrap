/**
 * Default task, builds everything and waits for changes
 */
var gulp = require('gulp')
gulp.task('default', ['html', 'assets', 'sass', 'webpack'])
