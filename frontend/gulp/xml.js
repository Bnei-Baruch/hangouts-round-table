'use strict';

var gulp = require('gulp');

var $ = require('gulp-load-plugins')();

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

/* Generate Hangouts app XML */
gulp.task('xml', function () {

  gulp.src('src/hangouts.html')
    .pipe($.wrap(template))
    .pipe($.template())
    .pipe($.rename('hangouts.xml'))
    .pipe(gulp.dest('src/'));
});
