import ACL from 'acl';

export default function () {
	var app = this;

	app.acl = new ACL(new ACL.mongodbBackend(app.db.mongo, 'acl_', true));

	app.logger.info('initialized access control list');
}
