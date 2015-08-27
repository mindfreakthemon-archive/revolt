import express from 'express';
import passport from 'passport';

import inherit from 'core/helpers/express/inherit';
import loggedTo from 'core/helpers/auth/loggedTo';

import User from 'core/models/user';

export default function () {
	var router = express();

	router.on('mount', inherit);

	router.on('mount', function () {
		router
			.all('*', function (req, res, next) {
				var url = req.protocol + '://' + req.get('host');

				if (passport._strategies.google) {
					passport._strategies.google._relyingParty.returnUrl = url + router.mountpath + '/google/callback';
					passport._strategies.google._relyingParty.realm = url;
				}

				if (passport._strategies.imgur) {
					passport._strategies.imgur._callbackURL = url + router.mountpath + '/imgur/callback';
					//passport._strategies.imgur._relyingParty.realm = url;
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
	});

	return router;
}