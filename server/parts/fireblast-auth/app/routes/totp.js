import passport from 'passport';

import render from 'fireblast-core/lib/helpers/utils/render';
import loggedTo from 'fireblast-auth/lib/helpers/auth/loggedTo';
import totpConfigured from 'fireblast-auth/lib/helpers/totp/totpConfigured';
import * as otp from 'fireblast-auth/lib/helpers/totp/otp';

import TOTPForm from 'fireblast-auth/lib/forms/totp';

export const MOUNT_PATH = '/totp';

export default function (router) {
	router
		.get('/', render('totp/index'))

		.get('/setup', function (req, res) {
			var form = new TOTPForm(req, res),
				key = otp.generateKey(otp.TOTP_RANDOM_BYTES),
				encodedKey = otp.encodeKey(key),
				period = otp.TOTP_PERIOD,
				otpUrl = otp.formatUrl(encodedKey, period, req.user.id);

			form.data = {
				key, period
			};

			res.render('totp/setup', {
				totp: form,
				encodedKey: encodedKey,
				period: period,
				key: key,
				image: 'https://chart.googleapis.com/chart?chs=166x166&chld=L|0&cht=qr&chl=' + encodeURIComponent(otpUrl)
			});
		})
		.post('/setup', function (req, res) {
			var user = req.user,
				form = new TOTPForm(req, res),
				result;

			form.handle({
				success: function (form) {
					var code = form.data.code,
						key = form.data.key,
						period = form.data.period;

					result = otp.verify(code, key, period);

					if (!result) {
						res.respond('error', 1, 'Wrong code', router.mountpath);

						res.redirect(router.mountpath);
						return;
					}

					user.totp.key = key;
					user.totp.period = period;

					user.save(function () {
						res.redirect(router.mountpath);
					});
				},
				other: function () {
					res.respond('error', 1, 'Wrong form', router.mountpath);

					res.redirect(router.mountpath);
				}
			});
		})

		// to ensure it is configured
		.all('/enable', totpConfigured(router.mountpath + '/setup'))

		.get('/enable', render('totp/enable'))
		.post('/enable', function (req, res) {
			var user = req.user;

			user.totp.enabled = true;
			user.save(function () {
				res.respond('success', 0, 'TOTP was enabled', router.mountpath);
			});
		})

		.get('/disable', render('totp/disable'))
		.post('/disable', function (req, res) {
			var user = req.user;

			user.totp.enabled = false;
			user.save(function () {
				res.respond('success', 0, 'TOTP was disabled', router.mountpath);
			});
		})

		.get('/verify', render('totp/verify'))
		.post('/verify',
		passport.authenticate('totp', {
			failureRedirect: router.mountpath + '/verify'
		}),
		function(req, res, next) {
			req.session.totp = true;
			next();
		},
		loggedTo('/'));
}

