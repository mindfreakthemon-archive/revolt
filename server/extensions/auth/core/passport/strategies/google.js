import User from 'core/models/user';
export const KEY = 'google';
export * from 'passport-google';

export function verify(req, identifier, profile, done) {
	var data = {
		name: profile.displayName
	};

	profile.emails.some(function (v) {
		if (v.value) {
			data.email = v.value;
			return true;
		}
	});

	User.auth(req, 'google', identifier, data, done);
}

export function configure() {
	return {
		returnURL: 'http://localhost/auth/google/return',
		realm: 'http://localhost',
		passReqToCallback: true
	};
}