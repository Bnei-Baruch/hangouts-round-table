'use strict';

var gulp = require('gulp');

var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files']
});

gulp.task('jshint', function () {
  return gulp.src(['src/components/**/*.js'])
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.size());
});

gulp.task('index', function () {
  return gulp.src('src/index.html')
    .pipe($.vulcanize({
      inline: true,
      strip: true,
      dest: '.tmp'
    }))
    .pipe($.minifyHtml({
      empty: true,
      spare: true,
      quotes: true
    }))
    .pipe(gulp.dest('dist'))
    .pipe($.size());
});

gulp.task('hangouts', ['hangouts-participant'], function () {
  var manifest = gulp.src('.tmp/rev-manifest.json');

  var pipe = gulp.src('src/hangouts.html')
    .pipe($.replace(/components\/hangouts-participant/g, 'components'))
    .pipe($.revReplace({manifest: manifest}))
    .pipe($.minifyHtml({
      empty: true,
      spare: true,
      quotes: true
    }));

  var xml = require('./xml');

  xml.pipeHangoutsXml(pipe)
    .pipe(gulp.dest('dist'))
    .pipe($.size());
});

gulp.task('hangouts-participant', function () {
  return gulp.src('src/components/hangouts-participant/hangouts-participant.html')
    .pipe($.vulcanize({
      inline: true,
      strip: true,
      dest: '.tmp/components'
    }))
    .pipe($.replace(/\.\.\/src\/components\/(.*)\.(gif|png|jpeg)/g, 'images/$1.$2'))
    .pipe($.minifyHtml({
      empty: true,
      spare: true,
      quotes: true
    }))
    .pipe($.rev())
    .pipe(gulp.dest('dist/components'))
    .pipe($.rev.manifest())
    .pipe(gulp.dest('.tmp'));
});

gulp.task('images', function () {
  return gulp.src(['src/components/**/*.{png,gif,jpeg}',
                   'src/bower_components/**/*.{png,gif,jpeg}'])
    .pipe($.imagemin({
      optimizationLevel: 3,
      progressive: true,
      interlaced: true
    }))
    .pipe(gulp.dest('dist/images'))
    .pipe($.size());
});

gulp.task('fonts', function () {
  var fontPaths = $.mainBowerFiles().slice();

  return gulp.src(fontPaths)
    .pipe($.filter('**/*.{eot,svg,ttf,woff}'))
    .pipe($.flatten())
    .pipe(gulp.dest('dist/fonts'))
    .pipe($.size());
});

gulp.task('clean', function () {
  return gulp.src(['.tmp', 'dist'], { read: false }).pipe($.rimraf());
});

gulp.task('build', ['jshint', 'config', 'images', 'fonts', 'index', 'hangouts']);
