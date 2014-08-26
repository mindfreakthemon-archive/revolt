var mongoose = require('mongoose'),
	url = require('url');

module.exports = function (app) {
	var client,
		endpoint = app.conf.get('mongo');

	if (!endpoint) {
		app.logger.log('no mongo instance was defined');
		return;
	}

	app.logger.info('connecting to mongodb');

	mongoose.connect(endpoint);

	client = mongoose.connection;

	client.on('error', app.logger.error.bind(app.logger, 'mongodb connection error:'));

	client.once('open', function () {
		app.logger.info('mongodb client is ready');
	});

	app.db.mongo = client;
};
