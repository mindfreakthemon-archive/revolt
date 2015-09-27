import User from 'fireblast-auth/lib/models/user';
export const KEY = 'local';
export * from 'passport-local';

export function verify(username, password, done) {
	User.login(username, password, done);
}

export function configure() {
	return {
		usernameField: 'username',
		passwordField: 'password'
	};
}
