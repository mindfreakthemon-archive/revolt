/**
 * Triggers an event on app
 * @param event
 * @returns {Function}
 */
export default function (event) {
	var args = Array.prototype.slice.call(arguments, 1);

	return function (request, response, next) {
		request.trigger.apply(request, [event].concat(args));

		next();
	};
}
