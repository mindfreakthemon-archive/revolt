module.exports = {
	strategy: require('passport-totp').Strategy,
	verify: function (app, user, done) {
		done(null, user.totpKey(), user.totpPeriod());
	}
};
