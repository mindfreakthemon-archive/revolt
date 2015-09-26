import convict from 'convict';
import path from 'path';

export default function () {
	var app = this,
		schema = require(path.resolve(app.root, 'schema.config.json')),
		conf = app.conf = app.locals.conf = convict(schema);

	conf.loadFile(path.resolve(app.root, 'default.config.json'));

	app.logger.info('loaded default configuration');

	try {
		conf.loadFile(path.resolve(app.root, 'config.json'));

		app.logger.info('environment configuration was loaded');
	} catch (e) {
		app.logger.warn('couldn\'t load environment configuration:', e);
	}
}
