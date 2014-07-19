var mailer = require('express-mailer');

module.exports = function (app) {
	mailer.extend(app, app.conf.get('mailer'));

	app.logger.info('installed mailer');

	app.on('update:mailer', function () {
		app.mailer.update(app.conf.get('mailer'), function () {
			app.logger.info('updated mailer configuration');
		});
	});
};
