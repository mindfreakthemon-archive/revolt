var gulp = require('gulp'),
	connect = require('gulp-connect');

gulp.task('connect', function () {
	connect.server({
		root: ['public', 'app'],
		host: '127.0.0.1',
		port: 8000,
		livereload: true
	});
});
