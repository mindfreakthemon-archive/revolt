module.exports = function (app) {
	/**
	 * Renders template. Simple stuff
	 * @param template
	 * @returns {Function}
	 */
	app.helpers.render = function (template) {
		var args = Array.prototype.slice.call(arguments, 0);

		return function (req, res) {
			res.render.apply(res, args);
		};
	};

	/**
	 * Redirects user to other page. Simple stuff.
	 * @param url
	 * @returns {Function}
	 */
	app.helpers.redirect = function (url) {
		var args = Array.prototype.slice.call(arguments, 0);

		return function (req, res) {
			res.redirect.apply(res, args);
		};
	};
};
