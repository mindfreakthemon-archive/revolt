var gulp = require('gulp'),
	jshint = require('gulp-jshint');

gulp.task('lint', function () {
	return gulp.src('./client/app/js/*.es6')
		.pipe(jshint({
			esnext: true
		}))
		.pipe(jshint.reporter('default'))
		.pipe(jshint.reporter('fail'));
});
