module.exports = {
	strategy: require('passport-github').Strategy,
	verify: function (app, req, accessToken, refreshToken, profile, done) {
		var data = {
			name: profile.displayName
		};

		profile.emails.some(function (v) {
			if (v.value) {
				data.email = v.value;
				return true;
			}
		});

		app.models.User.auth(req, 'github', profile.id, data, done);
	},
	configure: function (conf) {
		return {
			clientID: conf.client_id,
			clientSecret: conf.client_secret,
			scope: ['user:email'],
			passReqToCallback: true
		};
	}
};
