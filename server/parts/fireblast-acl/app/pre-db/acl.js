import Fellowship from 'fellowship';

export default function () {
	var app = this;

	app.acl = new Fellowship({
		"media:item": {
			"create": 1,
			"read": 2,
			"update": 4,
			"delete": 8
		},
		"media:items": {
			"list": 1
		}
	}, {
		guest: { "media:item": 15, "media:items": 1 },
		user: { "media:item": 15, "media:items": 1 }
	});

	app.logger.debug('initialized access control list');
}
