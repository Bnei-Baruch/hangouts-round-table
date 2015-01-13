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

gulp.task('html', ['scripts', 'partials'], function () {
  var htmlFilter = $.filter('*.html');
  var jsFilter = $.filter('**/*.js');
  var cssFilter = $.filter('**/*.css');
  var assets;

  return gulp.src('src/*.html')
    .pipe($.inject(gulp.src('.tmp/components/**/*.js'), {
      read: false,
      starttag: '<!-- inject:partials -->',
      addRootSlash: false,
      addPrefix: '../'
    }))
    .pipe(assets = $.useref.assets())
    .pipe($.rev())
    .pipe(jsFilter)
    .pipe($.ngAnnotate())
    .pipe($.uglify({preserveComments: $.uglifySaveLicense}))
    .pipe(jsFilter.restore())
    .pipe(cssFilter)
    .pipe($.csso())
    .pipe(cssFilter.restore())
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe($.revReplace())
    .pipe(htmlFilter)
    .pipe($.minifyHtml({
      empty: true,
      spare: true,
      quotes: true
    }))
    .pipe(htmlFilter.restore())
    .pipe(gulp.dest('dist'))
    .pipe($.size());
});

gulp.task('images', function () {
  return gulp.src('src/assets/images/**/*')
    .pipe($.cache($.imagemin({
      optimizationLevel: 3,
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest('dist/assets/images'))
    .pipe($.size());
});

gulp.task('fonts', function () {
  var fontPaths = $.mainBowerFiles().slice();
  fontPaths.push('src/assets/fonts/**/*');

  return gulp.src(fontPaths)
    .pipe($.filter('**/*.{eot,svg,ttf,woff}'))
    .pipe($.flatten())
    .pipe(gulp.dest('dist/fonts'))
    .pipe($.size());
});

gulp.task('clean', function () {
  return gulp.src(['.tmp', 'dist'], { read: false }).pipe($.rimraf());
});

gulp.task('build', ['jshint', 'config', 'index', 'hangouts', 'images', 'fonts']);
