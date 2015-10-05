import mailer from 'express-mailer';

export default function () {
	var app = this,
		options = app.conf.get('email.mailer');

	if (!options) {
		app.logger.warn('mailer is not configured');
		return;
	}

	mailer.extend(app, options);

	app.logger.debug('installed mailer');
}
