var gulp = require('gulp'),
	nodemon = require('gulp-nodemon');

gulp.task('nodemon', function () {
	nodemon({
		watch: 'server/server.js',
		script: 'server/server.js',
		env: {
			NODE_DEBUG: 'request'
		}
	}).on('restart', function () {
		console.log('restarted!');
	});
});