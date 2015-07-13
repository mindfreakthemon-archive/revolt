var gulp = require('gulp'),
	path = require('path'),
	through = require('through2'),
	jade = require('gulp-jade'),
	connect = require('gulp-connect'),
	plumber = require('gulp-plumber'),
	concat = require('gulp-concat'),
	insert = require('gulp-insert'),
	wrap = require('gulp-wrap-amd');

function modify() {
	function transform(file, enc, callback) {
		if (!file.isBuffer()) {
			this.push(file);
			callback();
			return;
		}

		var funcName = path.basename(file.path, '.js'),
			contents = file.contents.toString()
				.replace('function template(locals) {', 'tpl.' + funcName + ' = function (locals) {');

		file.contents = new Buffer(contents);

		this.push(file);

		callback();
	}

	return through.obj(transform);
}


gulp.task('tpl', function () {
	gulp.src('./client/app/tpl/**/*.jade')
		.pipe(plumber())
		.pipe(jade({
			client: true
		}))
		.pipe(modify())
		.pipe(concat('templates.js'))
		.pipe(insert.prepend('var tpl = {};'))
		.pipe(wrap({
			deps: ['jade'],
			params: ['jade'],
			exports: 'tpl'
		}))
		.pipe(gulp.dest('./client/public/'))
		.pipe(connect.reload());
});