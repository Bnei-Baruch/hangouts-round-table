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

function htmlPipe(pipe) {
}

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

gulp.task('hangouts', function () {
  var template = '<?xml version="1.0" encoding="UTF-8" ?>\n' +
    '<Module>\n' +
    '  <ModulePrefs title="Round Table">\n' +
    '    <Require feature="rpc" />\n' +
    '    <Require feature="views" />\n' +
    '    <Require feature="locked-domain" />\n' +
    '  </ModulePrefs>\n' +
    '  <Content type="html"><![CDATA[\n' +
    '    <%= contents %>' +
    '    ]]>\n' +
    '  </Content>\n' +
    '</Module>\n';

  return gulp.src('src/hangouts.html')
    .pipe($.replace(/%frontend_url%/g, ''))
    .pipe($.vulcanize({
      inline: true,
      strip: true,
      dest: '.tmp'
    }))
    .pipe($.replace(/\.\.\/src\/components\/(.*)\.(gif|png|jpeg)/g, 'images/$1.$2'))
    .pipe($.minifyHtml({
      empty: true,
      spare: true,
      quotes: true
    }))
    .pipe($.wrap(template))
    .pipe($.template())
    .pipe($.rename('hangouts.xml'))
    .pipe(gulp.dest('dist'))
    .pipe($.size());
});

gulp.task('images', function () {
  return gulp.src(['src/components/**/*.{png,gif,jpeg}',
                   'src/bower_components/**/*.{png,gif,jpeg}'])
    .pipe($.cache($.imagemin({
      optimizationLevel: 3,
      progressive: true,
      interlaced: true
    })))
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

gulp.task('build', ['config', 'images', 'fonts', 'index', 'hangouts']);
