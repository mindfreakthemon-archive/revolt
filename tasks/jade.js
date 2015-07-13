var gulp = require('gulp'),
	plumber = require('gulp-plumber'),
	jade = require('gulp-jade'),
	connect = require('gulp-connect'),
	changed = require('gulp-changed');

gulp.task('jade', function () {
	gulp.src('./client/app/jade/**/*.jade')
		.pipe(changed('./client/public', { extension: '.html' }))
		.pipe(plumber())
		.pipe(jade())
		.pipe(gulp.dest('./client/public'))
		.pipe(connect.reload());
});