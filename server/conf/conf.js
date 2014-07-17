var convict = require('convict');

module.exports = function (app) {
	var conf = app.conf = app.locals.conf = convict({
		redis: {
			default: null,
			format: 'url',
			env: 'REDISTOGO_URL'
		},
		mongo: {
			default: null,
			format: 'url',
			env: 'MONGOHQ_URL'
		}
	});

	conf.loadFile('default.config.json');

	app.logger.info('loaded default configuration');

	try {
		conf.loadFile('config.json');

		app.logger.info('environment configuration was loaded')
	} catch (e) {
		app.logger.warn('couldn\'t load environment configuration:', e);
	}
};
