var gulp = require('gulp'),
	chai = require('chai'),
	sinonChai = require('sinon-chai'),
	app = require('app-module-path'),
	mocha = require('gulp-mocha');

chai.should();
chai.use(sinonChai);

gulp.task('test', function () {
	app.addPath('./server');
	app.addPath('./server/parts');

	return gulp.src('server/**/tests/**/*.js', { read: false })
		.pipe(mocha({
			compilers: 'js:babel-core/register'
		}));
});