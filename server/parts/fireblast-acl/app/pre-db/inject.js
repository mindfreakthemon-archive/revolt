import UserSchema from 'fireblast-auth/lib/schemas/user';
import GuestSchema from 'fireblast-auth/lib/schemas/guest';

export default function () {
	var app = this;

	function checker(resource, permission) {
		return app.acl.hasPermission(this.group, resource, permission);
	}

	UserSchema.add({
		group: {
			type: String,
			default: 'user'
		}
	});

	GuestSchema.add({
		group: {
			type: String,
			default: 'guest'
		}
	});

	UserSchema.method('can', checker);
	GuestSchema.method('can', checker);
}