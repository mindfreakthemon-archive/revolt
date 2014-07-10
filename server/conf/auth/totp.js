var passport = require('passport'),
	TotpStrategy = require('passport-totp').Strategy;

module.exports = function (app) {
	passport.use(new TotpStrategy(function (user, done) {
		done(null, user.totpKey(), user.totpPeriod());
	}));
};
