/**
 * Pass next() if user is logged out
 * redirect to {@var url} otherwise
 * @param url
 * @returns {Function}
 */
export default function (url) {
	return function (req, res, next) {
		if (req.user) {
			res.redirect(url);
			return;
		}

		next();
	};
}
