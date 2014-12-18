'use strict';
var gulp = require('gulp');
//var debug = require('gulp-debug');
var concat = require('gulp-concat');
var uglify = require('gulp-uglifyjs');
var help = require('gulp-task-listing');
var nodemon = require('gulp-nodemon');
var livereload = require('gulp-livereload');
var stylus = require('gulp-stylus');
var rimraf = require('gulp-rimraf');

var options = {
	buildDir: './src/public/_build',
  stylusDir:
    ['./src/public/styles/*.styl',
     './src/public/styles/*.css'],
  javascriptDir: './src/public/scripts/**/*',
  sourceMapDir: '/scripts/map',
	htmlDir: 'src/public/*.html'
};

/**
 * Util stuff
 */
gulp.task('clean', function cleanBuild() {
  rimraf(options.buildDir);
});

/**
 * Styles - processing, concatenation
 */

gulp.task('styles', function() {
	var glob = gulp.src(options.stylusDir);

	glob
		.pipe(stylus())
		.pipe(concat('styles.css'))
		.pipe(gulp.dest(options.buildDir + '/styles'));

});

/**
 * Javascript
 */
gulp.task('javascript', function() {
  var glob = gulp.src(options.javascriptDir);

  // Copy the source files for usage in the map
  glob.pipe(gulp.dest(options.buildDir + '/scripts'));

  // Concatenate them and then point the map to them.
  glob
    .pipe(uglify('app.js', {
      'outSourceMap': true,
      'sourceMapRoot': 'http://localhost:8080/scripts'
    }))
		.pipe(gulp.dest(options.buildDir + './scripts'));
});

/**
 * Pages
 */
gulp.task('html', function() {
  var glob = gulp.src(options.htmlDir); 

  glob.
    pipe(gulp.dest(options.buildDir));
});

/**
 * Watches
 */
gulp.task('watch-javascript', function() {
    gulp.watch(options.javascriptDir, ['javascript', livereload.changed]);
});

gulp.task('watch-styles', function() {
	gulp.watch(options.stylusDir, ['styles', livereload.changed]);
});

gulp.task('watch-html', function() {
	gulp.watch(options.htmlDir, ['html', livereload.changed]);
});

gulp.task('serve', function() {
	nodemon({
		script: 'src/server/app.js',
		watch: ['src/server']
	});

	livereload.listen();
});

gulp.task('build', ['clean', 'javascript', 'styles', 'html']);

// Watch all the things
gulp.task('watch', ['watch-styles', 'watch-html', 'watch-javascript', 'serve']);

gulp.task('help', help);
gulp.task('default', ['help']);
