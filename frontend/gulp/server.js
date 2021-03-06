'use strict';

var gulp = require('gulp');

var browserSync = require('browser-sync');

function setCorsHeaders(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
}

function browserSyncInit(baseDir, files, browser, https) {
  browser = browser === undefined ? 'default' : browser;

  browserSync.instance = browserSync.init(files, {
    startPath: '/index.html',
    server: {
      baseDir: baseDir,
      directory: true,
      middleware: [
          setCorsHeaders
      ]
    },
    browser: browser,
    https: https
  });

}

function serveSource(https) {
  browserSyncInit([
    'src',
    '.tmp'
  ], [
    '.tmp/{app,components}/**/*.css',
    'src/assets/images/**/*',
    'src/*.html',
    'src/{app,components}/**/*.html',
    'src/{app,components}/**/*.js'
  ], undefined, https);
}

gulp.task('serve', ['watch'], function () {
  serveSource(false);
});

gulp.task('serve:dist', ['build'], function () {
  browserSyncInit('dist');
});

gulp.task('serve:ssl', ['watch'], function() {
  serveSource(true);
});
