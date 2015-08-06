var redis = require('redis'),
	url = require('url');

export default function (done) {
	var app = this,
		client,
		endpoint = app.conf.get('redis'),
		params;

	if (!endpoint) {
		app.logger.log('no redis instance was defined');
		return;
	}

	params = url.parse(endpoint);
	client = redis.createClient(params.port, params.hostname);

	if (params.auth) {
		client.auth(params.auth.split(':').pop());
	}

	if (params.pathname && params.pathname.length > 1) {
		client.select(params.pathname.slice(1), function () {
			app.logger.info('redis database was selected');
		});
	}

	client.on('error', function (error) {
		app.logger.error('redis connection error:', error.toString());
	});

	client.on('ready', function () {
		app.logger.info('redis client is ready');

		done();
	});

	app.logger.info('created redis client');

	app.db.redis = client;
};
