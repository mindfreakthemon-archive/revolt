module.exports = {
	strategy: require('passport-google').Strategy,
	verify: function (app, req, identifier, profile, done) {
		var data = {
			name: profile.displayName
		};

		profile.emails.some(function (v) {
			if (v.value) {
				data.email = v.value;
				return true;
			}
		});

		app.models.User.auth(req, 'google', identifier, data, done);
	},
	configure: function () {
		return {
			returnURL: 'http://localhost/auth/google/return',
			realm: 'http://localhost',
			passReqToCallback: true
		};
	}
};
