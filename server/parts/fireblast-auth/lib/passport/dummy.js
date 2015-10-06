import User from 'fireblast-auth/lib/models/user';
export const KEY = 'dummy';
export * from 'passport-dummy';

export function verify(done) {
	done(null, new User());
}
