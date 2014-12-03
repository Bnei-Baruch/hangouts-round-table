'use strict';

var gulp = require('gulp');

var $ = require('gulp-load-plugins')();

/* Generate config component from template */
gulp.task('config', function () {
  gulp.src('src/components/app-config/app-config.template.html')
    .pipe($.rename('app-config.html'))
    .pipe($.data(function () {
      return {settings: require('../config.json')};
    }))
    .pipe($.template())
    .pipe(gulp.dest('src/components/app-config'));
});
