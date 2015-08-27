import express from 'express';

import inherit from 'core/helpers/express/inherit';

import LocaleForm from 'core/forms/locale';

export default function () {
	var router = express();

	router.on('mount', inherit);

	router.on('mount', function (app) {
		router
			.post('/select', function (req, res) {
				var form = new LocaleForm(req, res);

				form.handle({
					success: function (form) {
						res.sendLocaleCookie(form.data.locale);
					}
				});

				res.redirect('/');
			});
	});

	return router;
}