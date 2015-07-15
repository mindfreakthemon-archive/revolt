module.exports = {
	strategy: require('passport-local').Strategy,
	verify: function (app, username, password, done) {
		app.models.User.login(username, password, done);
	},
	configure: function (conf) {
		return {
			usernameField: 'username',
			passwordField: 'password'
		};
	}
};
