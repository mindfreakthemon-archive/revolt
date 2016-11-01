import passport from 'passport';

import loggedTo from 'fireblast-auth/lib/helpers/auth/loggedTo';
import emit from 'fireblast-core/lib/helpers/utils/emit';
import render from 'fireblast-core/lib/helpers/utils/render';

export const MOUNT_PATH = '/auth';

export default function (app) {
	app
		.all('*', function (req, res, next) {
			var url = req.protocol + '://' + req.get('host');

			if (passport._strategies.google) {
				passport._strategies.google._callbackURL = url + app.mountpath + '/google/callback';
			}

			if (passport._strategies.imgur) {
				passport._strategies.imgur._callbackURL = url + app.mountpath + '/imgur/callback';
			}

			if (passport._strategies.github) {
				passport._strategies.github._callbackURL = url + app.mountpath + '/github/callback';
			}

			next();
		})

		.get('/imgur', passport.authenticate('imgur'))
		.get('/imgur/callback',
		passport.authenticate('imgur', {
			failureRedirect: app.mountpath + '/login'
		}),
		emit('auth:login:imgur'),
		loggedTo('/'))

		.get('/google', passport.authenticate('google'))
		.get('/google/callback',
		passport.authenticate('google', {
			failureRedirect: app.mountpath + '/login'
		}),
		emit('auth:login:google'),
		loggedTo('/'))

		.get('/github', passport.authenticate('github'))
		.get('/github/callback',
		passport.authenticate('github', {
			failureRedirect: app.mountpath + '/login'
		}),
		emit('auth:login:github'),
		loggedTo('/'))

		.get('/login', render('auth/login'))
		.post('/login',
		function (req, res, next) {
			passport.authenticate('local', function (err, user) {
				if (err) {
					return next(err);
				}

				if (!user) {
					return res.render('auth/login');
				}

				req.login(user, next);
			})(req, res, next);
		},
		emit('auth:login:local'),
		loggedTo('/'))

		.get('/logout',
		function (req, res, next) {
			req.logout();
			next();
		},
		emit('auth:logout'),
		loggedTo('/'))

		.get('/remove',
		function (req, res) {
			var id = req.user.id;

			req.logout();

			app.model.User.findOneAndRemove(id, function () {
				res.redirect('/');
			});
		});
}
