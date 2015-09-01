import User from 'parts/auth/lib/models/user';
export const KEY = 'github';
export * from 'passport-github';

export function verify(req, accessToken, refreshToken, profile, done) {
	var data = {
		name: profile.displayName
	};

	profile.emails.some(function (v) {
		if (v.value) {
			data.email = v.value;
			return true;
		}
	});

	User.auth(req, 'github', profile.id, data, done);
}

export function configure(conf) {
	return {
		clientID: conf.client_id,
		clientSecret: conf.client_secret,
		scope: ['user:email'],
		passReqToCallback: true
	};
}