var express = require('express'),
	passport = require('passport'),
	crypto = require('crypto'),
	base32 = require('thirty-two'),
	url = require('url');

module.exports = function (app) {
	var router = express.Router();

	router
		.get('/setup', function (req, res) {
			var user = req.user,
				key = user.totpKey(),
				period = user.totpPeriod(),
				encodedKey, otpUrl;

			if (!key) {
				// new two-factor setup.  generate and save a secret key
				try {
					key = crypto.randomBytes(5).toString('hex');
				} catch (e) {
					key = crypto.pseudoRandomBytes(5).toString('hex');
				}
			}

			encodedKey = base32.encode(key).toString();

			otpUrl = url.format({
				protocol: 'otpauth',
				slashes: true,
				hostname: 'totp',
				pathname: user.id(),
				query: {
					secret: encodedKey,
					period: 30
				}
			});
			
			res.render('totp/setup', {
				key: encodedKey,
				image: 'https://chart.googleapis.com/chart?chs=166x166&chld=L|0&cht=qr&chl=' + encodeURIComponent(otpUrl)
			});
		});

	app.use('/totp', router);
};
