/**
 * Matches the hostname
 * @param hostname
 * @returns {Function}
 * */
export default function (hostname) {
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
}
