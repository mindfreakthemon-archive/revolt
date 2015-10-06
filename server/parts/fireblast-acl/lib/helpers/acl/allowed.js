import DeniedException from 'fireblast-core/lib/exceptions/denied';

/**
 *
 * @param resource
 * @param permission
 * @returns {Function}
 */
export default function (resource, permission) {
	return (request, response, next) => {
		var app = response.locals.app,
			user = request.user;

		app.logger.debug('checking permissions for %s to %s in %s', user.id, permission, resource);

		if (app.acl.hasPermission(user.group, resource, permission)) {
			next();
		} else {
			next(new DeniedException(resource, permission));
		}
	};
}