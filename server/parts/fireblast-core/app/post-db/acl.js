import { default as ACL, memoryBackend as ACLMemory } from 'acl';

export default function (done) {
	var app = this;

	//app.acl = new ACL(new ACL.mongodbBackend(app.db.mongo, 'acl_', true));
	app.acl = new ACL(new ACLMemory());

	app.acl.addUserRoles('guest', ['guest'], () => {
		app.acl.allow([
			{
				roles: ['guest'],
				allows: [
					{
						resources: ['media:item'],
						permissions: ['create', 'update', 'delete', 'read']
					}
				]
			}
		], done);
	});



	app.logger.debug('initialized access control list');
}
