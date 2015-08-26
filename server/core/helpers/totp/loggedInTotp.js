import loggedIn from 'core/helpers/auth/loggedIn';

/**
 * Pass next() if user is logged in
 * redirect to {@var url} otherwise
 */
export default function (authUrl, totpKey) {
	return [
		loggedIn(authUrl),
		function (req, res, next) {
			var user = req.user;

			if (user.totp.enabled && !req.session.totp) {
				req.session.returnTo = req.originalUrl || req.url;
				res.redirect(totpKey);
				return;
			}

			next();
		}];
}
