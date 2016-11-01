import loggedOut from 'fireblast-auth/lib/helpers/auth/loggedOut';
import render from 'fireblast-core/lib/helpers/utils/render';

import RegistrationForm from 'fireblast-auth/lib/forms/registration';

export const MOUNT_PATH = '/registration';

export default function (app) {
	app
		.all('*', loggedOut('/'))

		.get('/', render('auth/registration'))
		.post('/',
		function (req, res) {
			var form = new RegistrationForm(req, res);

			form.handle({
				success: function (form) {
					var user = new app.model.User();

					user.local.username = form.data.username;
					user.local.password = form.data.password;
					user.email = form.data.email;

					user.save(function () {
						req.trigger('auth:registration:local', user);

						res.redirect('/');
					});
				},
				other: function () {
					res.render('auth/registration', {
						registration: form
					});
				}
			});
		});
}
