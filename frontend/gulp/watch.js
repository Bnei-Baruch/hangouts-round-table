'use strict';

var gulp = require('gulp');

gulp.task('watch', ['config'], function () {
  gulp.watch('src/{app,components}/**/*.js', ['jshint']);
  gulp.watch('src/assets/images/**/*', ['images']);
  gulp.watch('config.json', ['config']);
});
