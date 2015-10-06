import UserSchema from 'fireblast-auth/lib/schemas/user';

var GuestSchema = UserSchema.extend({
	_id: {
		type: String,
		default: 'guest'
	}
});

GuestSchema.pre('save', function () {
	throw new Error('Guest cannot be saved to the DB');
});

GuestSchema.method('isAuthenticated', function () {
	return false;
});

export default GuestSchema;