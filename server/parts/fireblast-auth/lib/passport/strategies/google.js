import User from 'fireblast-auth/lib/models/user';
export const KEY = 'google';
export * from 'passport-google-oauth2';

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

	User.auth(req, 'google', profile.id, data, done);
}

export function configure(conf) {
	return {
		clientID: conf.client_id,
		clientSecret: conf.client_secret,
		callbackURL: 'http://localhost/auth/google/return',
		passReqToCallback: true,
		scope: ['https://www.googleapis.com/auth/plus.login', 'https://www.googleapis.com/auth/plus.profile.emails.read']
	};
}