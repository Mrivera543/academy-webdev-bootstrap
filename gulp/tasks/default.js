/**
 * Default task, builds everything and waits for changes
 */
var gulp = require('gulp')
gulp.task('default', ['images', 'fonts', 'sass', 'webpack', 'standard', 'sass-lint'])
