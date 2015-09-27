import loggedOut from 'fireblast-auth/lib/helpers/auth/loggedOut';

import User from 'fireblast-auth/lib/models/user';
import RegistrationForm from 'fireblast-auth/lib/forms/registration';

export const MOUNT_PATH = '/registration';

export default function (router) {
	router
		.all('*', loggedOut('/'))

		.get('/', function (req, res) {
			var form = new RegistrationForm(req, res);

			res.render('auth/registration', {
				registration: form
			});
		})
		.post('/',
		function (req, res) {
			var form = new RegistrationForm(req, res);

			form.handle({
				success: function (form) {
					var user = new User();

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
