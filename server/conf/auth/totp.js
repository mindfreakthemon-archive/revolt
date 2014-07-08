var passport = require('passport'),
	TotpStrategy = require('passport-totp').Strategy;

module.exports = function (app) {
	passport.use(new TotpStrategy({
			passReqToCallback: true
		},
		function (req, user, done) {
			console.log(user);
		}
	));
};
