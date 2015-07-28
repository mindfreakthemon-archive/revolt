import acl from 'acl';

module.exports = function (app) {
	app.acl = new acl(new acl.mongodbBackend(app.db.mongo, 'acl_', true));
};
