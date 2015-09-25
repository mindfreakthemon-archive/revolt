export default function () {
	var app = this;

	app.on('auth:registration', function (event, user) {
		var email = user.get('email');

		if (!email) {
			app.logger.warn('not sending email to user#%d because no email was set', user.id);

			return;
		}

		app.logger.debug('sending mail to %s', email);

		app.mailer.send('email/registration', {
			to: email,
			subject: 'Registration email thank',
			user
		}, function (error) {
			if (error) {
				app.logger.error(error);

				return;
			}

			app.logger.debug('mail was sent: %s', email);
		});
	});

	app.logger.info('registered email registration service');
}


