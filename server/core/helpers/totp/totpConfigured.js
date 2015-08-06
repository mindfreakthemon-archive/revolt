/**
 *
 * @param url
 * @returns {Function}
 */
export default function (url) {
	return function (req, res, next) {
		var user = req.user;

		if (!user.totp.key || !user.totp.period) {
			res.redirect(url);
			return;
		}

		next();
	};
};