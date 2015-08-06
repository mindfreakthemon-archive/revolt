import express from 'express';

import User from 'core/models/user';

import inherit from 'core/helpers/express/inherit';
import loggedIn from 'core/helpers/auth/loggedIn';

export default function () {
	var router = express();

	router.on('mount', inherit);

	router
		.all('*', loggedIn('/auth/login'))

		.get('/remove',
		function (req, res) {
			var id = req.user.id;

			req.logout();

			User.findOneAndRemove(id, function () {
				res.redirect('/');
			});
		});

	return router;
};
