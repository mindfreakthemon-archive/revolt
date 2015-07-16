var gulp = require('gulp'),
	jshint = require('gulp-jshint');

gulp.task('lint', function () {
	return gulp.src([
			'./client/app/js/*.{es6,js}',
			'./server/**/*.{es6,js}'
		])
		.pipe(jshint({

		}))
		.pipe(jshint.reporter('jshint-stylish'))
		.pipe(jshint.reporter('fail'));
});
