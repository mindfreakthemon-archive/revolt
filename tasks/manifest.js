var gulp = require('gulp'),
	manifest = require('gulp-manifest');

gulp.task('manifest', function(){
	gulp.src(['public/**/*'])
		.pipe(manifest({
			hash: true,
			preferOnline: true,
			network: ['http://*', 'https://*', '*'],
			filename: 'app.manifest',
			exclude: 'app.manifest'
		}))
		.pipe(gulp.dest('public'));
});