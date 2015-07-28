import passport from 'passport';
import crypto from 'crypto';
import base32 from 'thirty-two';
import { totp } from 'notp';
import url from 'url';

module.exports = function (app) {
	var router = app.express();

	router.on('mount', function () {
		router
			.get('/', app.helpers.render('totp/index'))

			.get('/setup', function (req, res) {
				var key, encodedKey, otpUrl,
					period = 30;

				try {
					key = crypto.randomBytes(5).toString('hex');
				} catch (e) {
					key = crypto.pseudoRandomBytes(5).toString('hex');
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

				res.render('totp/setup', {
					encodedKey: encodedKey,
					period: period,
					key: key,
					image: 'https://chart.googleapis.com/chart?chs=166x166&chld=L|0&cht=qr&chl=' + encodeURIComponent(otpUrl)
				});
			})
			.post('/setup', function (req, res) {
				var code = req.body.code,
					key = req.body.key,
					period = req.body.period,
					user = req.user,
					result;

				result = totp.verify(code, key, {
					time: period
				});

				if (!result) {
					res.redirect(router.mountpath);
					return;
				}

				user.totp.key = key;
				user.totp.period = period;

				user.save(function () {
					res.redirect(router.mountpath);
				});
			})

			// to ensure it is configured
			.all('/enable', app.helpers.totpConfigured(router.mountpath + '/setup'))

			.get('/enable', app.helpers.render('totp/enable'))
			.post('/enable', function (req, res) {
				var user = req.user;

				user.totp.enabled = true;
				user.save(function () {
					res.respond('success', 0, 'TOTP was enabled', router.mountpath);
				});
			})

			.get('/disable', app.helpers.render('totp/disable'))
			.post('/disable', function (req, res) {
				var user = req.user;

				user.totp.enabled = false;
				user.save(function () {
					res.respond('success', 0, 'TOTP was disabled', router.mountpath);
				});
			})

			.get('/verify', app.helpers.render('totp/verify'))
			.post('/verify',
			passport.authenticate('totp', {
				failureRedirect: router.mountpath + '/verify'
			}),
			function(req, res, next) {
				req.session.totp = true;
				next();
			},
			app.helpers.loggedTo('/'));
	});


	app.use('/totp', router);
};
