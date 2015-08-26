import mongoose from 'mongoose';

export default function (done) {
	var app = this,
		client,
		endpoint = app.conf.get('mongo');

	if (!endpoint) {
		app.logger.log('no mongo instance was defined');
		return;
	}

	app.logger.info('connecting to mongodb');

	mongoose.connect(endpoint);

	client = mongoose.connection;

	client.on('error', function (error) {
		app.logger.error('mongodb connection error:', error.toString());
	});

	client.once('open', function () {
		app.logger.info('mongodb client is ready');

		done();
	});

	app.db.mongo = client;
}
