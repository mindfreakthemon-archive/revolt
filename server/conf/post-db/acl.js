import acl from 'acl';

export default function () {
	var app = this;

	app.acl = new acl(new acl.mongodbBackend(app.db.mongo, 'acl_', true));

	app.logger.info('initialized access control list');
};
