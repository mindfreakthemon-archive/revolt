var redis = require('redis'),
	url = require('url');

module.exports = function (app) {
	var client,
		endpoint = app.conf.get('redis'),
		params = url.parse(endpoint);

	client = redis.createClient(params.port, params.hostname);

	if (params.auth) {
		client.auth(params.auth.split(':')[1]);
	}

	if (params.pathname && params.pathname.length > 1) {
		client.select(params.pathname.slice(1), function () {
			app.logger.info('redis database was selected');
		});
	}

	client.on('error', app.logger.error.bind(app.logger, 'redis connection error:'));

	client.on('ready', function () {
		app.logger.info('redis client is ready');
	});

	app.logger.info('created redis client');

	app.db.redis = client;
};
