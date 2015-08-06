/**
 * Redirects user to returnTo session parameter
 * or to {@var url} if none exists
 * @param url
 * @returns {Function}
 */
export default function (url) {
	return function (req, res) {
		if (!req.session || !req.session.returnTo) {
			res.redirect(url);
			return;
		}

		var returnTo = req.session.returnTo;
		delete req.session.returnTo;

		res.redirect(returnTo);
	};
};