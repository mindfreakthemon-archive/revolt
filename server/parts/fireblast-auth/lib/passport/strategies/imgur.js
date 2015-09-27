import User from 'fireblast-auth/lib/models/user';
export const KEY = 'imgur';
export * from 'passport-imgur';

export function verify(req, accessToken, refreshToken, profile, done) {
	var data = {
		name: profile.url,
		email: profile.email
	};

	User.auth(req, 'imgur', profile.id, data, done);
}

export function configure(conf) {
	return {
		clientID: conf.client_id,
		clientSecret: conf.client_secret,
		callbackURL: 'http://localhost/auth/imgur/return',
		passReqToCallback: true
	};
}