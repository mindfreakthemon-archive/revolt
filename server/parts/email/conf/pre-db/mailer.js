import mailer from 'express-mailer';

export default function () {
	var app = this,
		options = app.conf.get('email.mailer');

	if (!options) {
		app.logger.info('mailer is not configured');
		return;
	}

	mailer.extend(app, options);

	app.logger.info('installed mailer');
}
