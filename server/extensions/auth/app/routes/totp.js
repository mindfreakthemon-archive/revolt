import passport from 'passport';
import crypto from 'crypto';
import base32 from 'thirty-two';
import { totp } from 'notp';
import url from 'url';

import express from 'express';

import inherit from 'core/helpers/express/inherit';
import render from 'core/helpers/utils/render';
import loggedTo from 'core/helpers/auth/loggedTo';
import totpConfigured from 'core/helpers/totp/totpConfigured';

import TOTPForm from 'core/forms/totp';

const TOTP_RANDOM_BYTES = 5;
const TOTP_PERIOD = 30;

export default function () {
	var router = express();

	router.on('mount', inherit);

	router.on('mount', function () {
		router
			.get('/', render('totp/index'))

			.get('/setup', function (req, res) {
				var key, encodedKey, otpUrl,
					form = new TOTPForm(req, res),
					period = TOTP_PERIOD;

				try {
					key = crypto.randomBytes(TOTP_RANDOM_BYTES).toString('hex');
				} catch (e) {
					key = crypto.pseudoRandomBytes(TOTP_RANDOM_BYTES).toString('hex');
				}

				encodedKey = base32.encode(key).toString();

				otpUrl = url.format({
					protocol: 'otpauth',
					slashes: true,
					hostname: 'totp',
					pathname: req.user.id,
					query: {
						secret: encodedKey,
						period: period
					}
				});

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

						result = totp.verify(code, key, {
							time: period
						});

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
	});


	return router;
};
