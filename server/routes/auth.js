var passport = require('passport');

module.exports = function (app) {
	var router = app.Router();

	router
		.all('*', function (req, res, next) {
			var url = req.protocol + '://' + req.get('host');

			if (passport._strategies.google) {
				passport._strategies.google._relyingParty.returnUrl = url + '/auth/google/callback';
				passport._strategies.google._relyingParty.realm = url;
			}

			if (passport._strategies.github) {
				passport._strategies.github._callbackURL = url + '/auth/github/callback';
			}
			next();
		})

		.get('/google', passport.authenticate('google'))
		.get('/google/callback',
		passport.authenticate('google', {
			failureRedirect: '/auth/login'
		}),
		app.helpers.loggedTo('/'))

		.get('/github', passport.authenticate('github'))
		.get('/github/callback',
		passport.authenticate('github', {
			failureRedirect: '/auth/login'
		}),
		app.helpers.loggedTo('/'))

		.get('/logout',
		app.helpers.loggedIn('/'),
		function (req, res) {
			req.logout();
			res.redirect('/');
		});

	app.use('/auth', router);
};
