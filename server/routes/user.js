module.exports = function (app) {
	var router = app.Router();

	router
		.all('*', app.helpers.loggedIn('/auth/login'))

		.get('/remove',
		function (req, res) {
			var id = req.user.id;

			req.logout();

			app.models.User.findOneAndRemove(id, function () {
				res.redirect('/');
			});
		});


	app.use('/user', router);
};
