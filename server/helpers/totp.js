module.exports = function (app) {
	/**
	 * Pass next() if user is logged in
	 * redirect to {@var url} otherwise
	 */
	app.helpers.loggedInTotp = function (authUrl, totpKey) {
		return [
			app.helpers.loggedIn(authUrl),
			function (req, res, next) {
				var user = req.user;

				if (user.totpKey() && !req.session.totp) {
					req.session.returnTo = req.originalUrl || req.url;
					res.redirect(totpKey);
					return;
				}

				next();
			}];
	};
};
