var gulp = require('gulp');

require('require-dir')('./tasks');

gulp.task('assets', ['bower', 'tpl', 'jade', 'stylus', 'js']);

gulp.task('watch', ['assets'], function () {
	gulp.watch(['./client/app/tpl/**/*.jade'], ['tpl']);
	gulp.watch(['./client/app/jade/**/*.jade'], ['jade']);
	gulp.watch(['./client/app/styl/**/*.styl'], ['stylus']);
	gulp.watch(['./client/app/js/**/*.{es6,js}'], ['js']);
	gulp.watch(['./client/app/**/*'], ['manifest']);
	gulp.run('nodemon');
});

gulp.task('default', ['connect', 'watch']);