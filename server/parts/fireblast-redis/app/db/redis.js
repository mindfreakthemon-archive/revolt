import redis from 'redis';
import url from 'url';

export default function () {
	var app = this,
		client,
		endpoint = app.conf.get('redis'),
		params;

	if (!endpoint) {
		app.logger.log('no redis instance was defined');
		return;
	}

	return new Promise((resolve, reject) => {
		params = url.parse(endpoint);
		client = redis.createClient(params.port, params.hostname);

		if (params.auth) {
			client.auth(params.auth.split(':').pop());
		}

		if (params.pathname && params.pathname.length > 1) {
			client.select(params.pathname.slice(1), () => app.logger.debug('redis database was selected'));
		}

		client.on('error', error => app.logger.error('redis connection error:', error.toString()));
		client.once('ready', () => (resolve(), app.logger.info('redis client is ready')));

		app.logger.debug('created redis client');

		app.db.redis = client;
	});
}
