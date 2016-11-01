import mongoose from 'mongoose';

export default function () {
	var app = this,
		client,
		endpoint = app.conf.get('mongo');

	if (!endpoint) {
		app.logger.warn('no mongo instance was defined');
		return;
	}

	return new Promise((resolve, reject) => {
		app.logger.debug('connecting to mongodb');

		mongoose.connect(endpoint);

		client = mongoose.connection;

		client.on('error', error => app.logger.error('mongodb connection error:', error.toString()));
		client.once('open', () => (resolve(), app.logger.info('mongodb client is ready')));

		app.db.mongo = client;
	});
}
