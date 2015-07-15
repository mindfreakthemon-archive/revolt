module.exports = function (app) {
	var router = app.Router();

	router
		.all('*', app.helpers.loggedOut('/'))

		.post('/',
		function (req, res) {
			app.forms.registration.handle(req, {
				success: function (form) {
					var user = new app.models.User();

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


	app.use('/registration', router);
};
