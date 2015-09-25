/**
 *
 * @param namespaces
 * @returns {Array}
 */
function groupEvents(namespaces) {
	var events = [];

	namespaces.reduce((left, right) => {
		var key = (left ? left + ':' : '') + right;

		events.push(key);

		return key;
	}, '');

	return events;
}

export default function () {
	var app = this;

	app.use(function (request, response, next) {

		/**
		 * this must be on request because it should be per-request event
		 * emits on app though
		 * @param event
		 */
		request.trigger = function (event) {
			var args = Array.prototype.slice.call(arguments, 1),
				namespaces = event.split(':'),
				events = groupEvents(namespaces);

			events.forEach((event) => {
				app.logger.debug('launching %s event', event);

				app.emit.apply(app, [event, {
					request,
					response,
					namespaces,
					events,
					event
				}].concat(args));
			});
		};

		next();
	});

	app.logger.info('configured express variables');
}
