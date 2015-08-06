export const KEY = 'totp';
export * from 'passport-totp';

export function verify(user, done) {
	if (!user.totp.enabled) {
		done(true);
		return;
	}

	done(null, user.totp.key, user.totp.period);
}

export function configure() {
	return {};
}
