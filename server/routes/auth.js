import passport from 'passport';

module.exports = function (app) {
	var router = app.express();

	router.on('mount', function () {
		router
			.all('*', function (req, res, next) {
				var url = req.protocol + '://' + req.get('host');

				if (passport._strategies.google) {
					passport._strategies.google._relyingParty.returnUrl = url + router.mountpath + '/google/callback';
					passport._strategies.google._relyingParty.realm = url;
				}

				if (passport._strategies.github) {
					passport._strategies.github._callbackURL = url + router.mountpath + '/github/callback';
				}
				next();
			})

			.get('/google', passport.authenticate('google'))
			.get('/google/callback',
			passport.authenticate('google', {
				failureRedirect: router.mountpath + '/login'
			}),
			app.helpers.loggedTo('/'))

			.get('/github', passport.authenticate('github'))
			.get('/github/callback',
			passport.authenticate('github', {
				failureRedirect: router.mountpath + '/login'
			}),
			app.helpers.loggedTo('/'))

			.post('/login',
			passport.authenticate('local', {
				failureRedirect: router.mountpath + '/login'
			}),
			app.helpers.loggedTo('/'))

			.get('/logout',
			app.helpers.loggedIn('/'),
			function (req, res) {
				req.logout();
				res.redirect('/');
			});

	});


	app.use('/auth', router);
};
