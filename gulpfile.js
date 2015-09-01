require('babel/register');

var gulp = require('gulp');

require('require-dir')('./tasks');

gulp.task('assets', ['bower', 'tpl', 'jade', 'stylus', 'js']);

gulp.task('watch', ['assets'], function () {
	gulp.watch(['./app/tpl/**/*.jade'], ['tpl']);
	gulp.watch(['./app/jade/**/*.jade'], ['jade']);
	gulp.watch(['./app/stylus/**/*.styl'], ['stylus']);
	gulp.watch(['./app/js/**/*.{es6,js}'], ['js']);
	gulp.watch(['./app/**/*'], ['manifest']);
});

gulp.task('default', ['connect', 'watch']);