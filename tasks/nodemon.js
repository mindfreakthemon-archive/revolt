var gulp = require('gulp'),
	nodemon = require('gulp-nodemon');

gulp.task('nodemon', function () {
	nodemon({
		script: 'server/server.js'
	}).on('restart', function () {
		console.log('restarted!');
	});
});