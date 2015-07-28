module.exports = {
	strategy: require('passport-totp').Strategy,
	verify: function (app, user, done) {
		if (!user.totp.enabled) {
			done(true);
			return;
		}

		done(null, user.totp.key, user.totp.period);
	}
};
