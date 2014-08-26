var mailer = require('express-mailer');

module.exports = function (app) {
	var options = app.conf.get('mailer');

	if (!options) {
		app.logger.info('mailer is not configured');
		return;
	}

	mailer.extend(app, options);

	app.logger.info('installed mailer');

	app.on('update:mailer', function () {
		app.mailer.update(app.conf.get('mailer'), function () {
			app.logger.info('updated mailer configuration');
		});
	});
};
