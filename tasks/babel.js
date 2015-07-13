var gulp = require('gulp'),
	connect = require('gulp-connect'),
	changed = require('gulp-changed'),
	rename = require('gulp-rename'),
	plumber = require('gulp-plumber'),
	sourcemaps = require('gulp-sourcemaps'),
	babel = require('gulp-babel');

gulp.task('js', function () {
	gulp.src('./client/app/js/**/*.{js,es6}')
		.pipe(changed('./client/public/js', { extension: '.js' }))
		.pipe(rename(function (path) {
			path.extname = '.js';
		}))
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(babel())
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('./client/public/js'))
		.pipe(connect.reload());
});