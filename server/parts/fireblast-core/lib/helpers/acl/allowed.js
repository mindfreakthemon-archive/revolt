import DeniedException from 'fireblast-core/lib/exceptions/denied';

/**
 *
 * @param resource
 * @param permission
 * @returns {Function}
 */
export default (resource, permission) => {
	return (request, response, next) => {
		var app = response.locals.app,
			user = request.user || { id: 'guest' };

		app.logger.debug('checking permissions for %s to %s in %s', user.id, permission, resource);

		app.acl.isAllowed(resource, user.id, permission, (error, allowed) => {
			if (error) {
				app.logger.warn('error checking permissions for %s to %s in %s: ', user.id, permission, resource, error);

				next(error);
			}

			if (allowed) {
				next();
			} else {
				next(new DeniedException(resource, permission));
			}
		});
	};
}