var path = require('path'),
	convict = require('convict');

module.exports = function (app) {
	var schema = require(path.resolve('schema.config.json')),
		conf = app.conf = app.locals.conf = convict(schema);

	conf.loadFile('default.config.json');

	console.log('loaded default configuration');

	try {
		conf.loadFile('config.json');

		console.log('environment configuration was loaded');
	} catch (e) {
		console.log('couldn\'t load environment configuration:', e);
	}

	app.require('./logger');
	app.require('./ext');
	app.require('./db');
	app.require('./passport');
};
