/**
 *
 * @param role
 * @param url
 * @returns {Function}
 */
export default function (role, url) {
	return function (req, res, next) {
		if (req.user.role() !== role) {
			res.redirect(url);
			return;
		}

		next();
	};
}
