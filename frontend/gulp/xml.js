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

function pipeHangoutsXml(pipe) {
  var config = require('../config.json', true);

  pipe.pipe($.wrap(template))
    .pipe($.template())
    .pipe($.replace(/%frontend_url%/g, config.frontendUrl))
    .pipe($.rename('hangouts.xml'));

    return pipe;
}

/* Generate Hangouts app XML */
gulp.task('xml', function () {

  var pipe = gulp.src('src/hangouts.html');
  pipeHangoutsXml(pipe).pipe(gulp.dest('src/'));
});

module.exports.pipeHangoutsXml = pipeHangoutsXml;
