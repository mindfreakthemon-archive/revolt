var gulp = require('gulp'),
	stylus = require('gulp-stylus'),
	connect = require('gulp-connect'),
	concat = require('gulp-concat'),
	changed = require('gulp-changed');

gulp.task('stylus', function () {
	gulp.src('./client/app/stylus/**/*.styl')
		.pipe(changed('./client/public/css', { extension: '.css' }))
		.pipe(stylus())
		.pipe(concat('style.css'))
		.pipe(gulp.dest('./client/public/css'))
		.pipe(connect.reload());
});