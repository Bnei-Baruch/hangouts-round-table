'use strict';

var gulp = require('gulp');

var $ = require('gulp-load-plugins')();

/* Generate config component from template */
gulp.task('config', function () {
  var config = require('../config.json', true);

  gulp.src('src/components/app-config/app-config.template.html')
    .pipe($.rename('app-config.html'))
    .pipe($.data(function () {
      return {config: JSON.stringify(config, null, 2)};
    }))
    .pipe($.template())
    .pipe(gulp.dest('src/components/app-config'));
});
