var gulp = require('gulp'),
	del = require('del');

gulp.task('clean', function (callback) {
	del([
		'./client/public/css',
		'./client/public/js',
		'./client/public/html',
		'./client/public/templates.js',
		'./client/public/app.manifest'
	], callback);
});