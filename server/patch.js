var fs = require('fs'),
	path = require('path'),
	express = require('express'),
	callerId = require('caller-id');

module.exports = function (app) {
	var keys = [
		'helpers',
		'models',
		'db',
		'conf',
		'logger'];

	keys.forEach(function (key) {
		app[key] = {};
	});

	app.require = function (dirname) {
		var args = Array.prototype.slice.call(arguments, 1), // w/o dir
			caller = callerId.getData(),
			resolved = path.resolve(path.dirname(caller.filePath), dirname),
			direct_file = path.extname(resolved) === '.js' ? resolved : resolved + '.js',
			index_file = path.join(resolved, 'index.js');

		args.unshift(app);

		if (fs.existsSync(direct_file) && fs.statSync(direct_file).isFile()) {
			require(direct_file).apply(null, args);
		} else if (fs.existsSync(index_file)) {
			require(index_file).apply(null, args);
		} else {
			fs.readdirSync(resolved)
				.forEach(function (filename) {
					var file = path.join(resolved, filename);

					if (fs.statSync(file).isFile()) {
						require(file).apply(null, args);
					}
				});
		}
	};

	app.include = function (dirname) {
		var caller = callerId.getData(),
			resolved = path.resolve(path.dirname(caller.filePath), dirname),
			direct_file = path.extname(resolved) === '.js' ? resolved : resolved + '.js',
			index_file = path.join(resolved, 'index.js');

		if (fs.existsSync(direct_file) && fs.statSync(direct_file).isFile()) {
			return require(direct_file);
		} else if (fs.existsSync(index_file)) {
			return require(index_file);
		} else {
			var result = {};

			fs.readdirSync(resolved)
				.forEach(function (filename) {
					var basename = path.basename(filename, '.js'),
						file = path.join(resolved, filename);

					if (fs.statSync(file).isFile()) {
						result[basename] = require(file);
					}
				});

			return result;
		}
	};

	app.Router = express.Router;
};
