/**
 * Redirects user to other page. Simple stuff.
 * @param url
 * @returns {Function}
 */
export default function (url) {
	var args = Array.prototype.slice.call(arguments, 0);

	return function (req, res) {
		res.redirect.apply(res, args);
	};
};