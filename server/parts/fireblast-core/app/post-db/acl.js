import ACL from 'acl';

export default function () {
	var app = this;

	//app.acl = new ACL(new ACL.mongodbBackend(app.db.mongo, 'acl_', true));
	app.acl = new ACL(new ACL.memoryBackend());

	//app.acl.allow([
	//	{
	//		roles: ['guest', 'member'],
	//		allows: [
	//			{
	//				resources: 'blogs',
	//				permissions: 'get'
	//			},
	//			{
	//				resources: ['forums', 'news'],
	//				permissions: ['get', 'put', 'delete']
	//			}
	//		]
	//	},
	//	{
	//		roles: ['gold', 'silver'],
	//		allows: [
	//			{
	//				resources: 'cash',
	//				permissions: ['sell', 'exchange']
	//			},
	//			{
	//				resources: ['account', 'deposit'],
	//				permissions: ['put', 'delete']
	//			}
	//		]
	//	}
	//]);

	app.logger.debug('initialized access control list');
}
