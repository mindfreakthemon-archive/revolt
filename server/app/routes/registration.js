import express from 'express';

import User from 'core/models/user';

import inherit from 'core/helpers/express/inherit';
import render from 'core/helpers/utils/render';
import loggedOut from 'core/helpers/auth/loggedOut';

import RegistrationForm from 'core/forms/registration';

export default function () {
	var router = express();

	router.on('mount', inherit);

	router
		.all('*', loggedOut('/'))

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
						res.redirect('/');
					});
				},
				error: function () {
					// @TODO
					res.redirect('/f');
				},
				empty: function () {
					// @TODO
					res.redirect('/a');
				}
			});
		});

	return router;
};
