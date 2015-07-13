var gulp = require('gulp'),
	rimraf = require('gulp-rimraf');

gulp.task('clean', function () {
	return gulp.src([
		'./client/public/css',
		'./client/public/js',
		'./client/public/html',
		'./client/public/templates.js',
		'./client/public/app.manifest'
	], { read: false })
		.pipe(rimraf());
});