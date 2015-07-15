var express = require('express');

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

	/**
	 * Matches the hostname
	 * @param hostname
	 * @returns {Function}
	 * */
	app.helpers.host = function (hostname) {
		var pattern = (hostname || '*')
				.replace(/\./g, '\\.')
				.replace(/\*/g, '(.*)'),
			rHost = new RegExp('^' + pattern + '$', 'i');

		return function (req, res, next) {
			var hostname = req.headers.host;

			if (!hostname) {
				return next('route');
			}

			var host = hostname.split(':')[0];

			if (!rHost.test(host)) {
				return next('route');
			}

			next();
		};
	};
};
