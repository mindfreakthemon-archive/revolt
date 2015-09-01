import passport from 'passport';

import loggedTo from 'parts/auth/lib/helpers/auth/loggedTo';

import User from 'parts/auth/lib/models/user';

export const MOUNT_PATH = '/auth';

export default function (router) {
	router
		.all('*', function (req, res, next) {
			var url = req.protocol + '://' + req.get('host');

			if (passport._strategies.google) {
				passport._strategies.google._relyingParty.returnUrl = url + router.mountpath + '/google/callback';
				passport._strategies.google._relyingParty.realm = url;
			}

			if (passport._strategies.imgur) {
				passport._strategies.imgur._callbackURL = url + router.mountpath + '/imgur/callback';
			}

			if (passport._strategies.github) {
				passport._strategies.github._callbackURL = url + router.mountpath + '/github/callback';
			}

			next();
		})

		.get('/imgur', passport.authenticate('imgur'))
		.get('/imgur/callback',
		passport.authenticate('imgur', {
			failureRedirect: router.mountpath + '/login'
		}),
		loggedTo('/'))

		.get('/google', passport.authenticate('google'))
		.get('/google/callback',
		passport.authenticate('google', {
			failureRedirect: router.mountpath + '/login'
		}),
		loggedTo('/'))

		.get('/github', passport.authenticate('github'))
		.get('/github/callback',
		passport.authenticate('github', {
			failureRedirect: router.mountpath + '/login'
		}),
		loggedTo('/'))

		.get('/login', function (req, res) {
			res.render('auth/login');
		})
		.post('/login',
		function (req, res, next) {
			passport.authenticate('local', function (err, user) {
				//if (err) {
				//	return next(err);
				//}

				if (!user) {
					return res.render('auth/login');
				}

				req.login(user, next);
			})(req, res, next);
		},
		loggedTo('/'))

		.get('/logout',
		function (req, res, next) {
			req.logout();
			next();
		},
		loggedTo('/'))

		.get('/remove',
		function (req, res) {
			var id = req.user.id;

			req.logout();

			User.findOneAndRemove(id, function () {
				res.redirect('/');
			});
		});
}