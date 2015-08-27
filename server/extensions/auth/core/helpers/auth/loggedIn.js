/**
 * Pass next() if user is logged in
 * redirect to {@var url} otherwise
 * @param url
 * @returns {Function}
 */
export default function (url) {
	return function (req, res, next) {
		if (!req.user) {
			if (req.session) {
				req.session.returnTo = req.originalUrl || req.url;
			}

			res.redirect(url);
			return;
		}

		next();
	};
}
