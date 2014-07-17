var passport = require('passport');

module.exports = function (app) {
	passport.serializeUser(function (user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function (id, done) {
		app.models.User.findById(id, done);
	});

	var strategies = app.include('./auth');

	Object.keys(strategies)
		.forEach(function (authKey) {
			var auth = strategies[authKey];

			function setup() {
				var options = {},
					conf = {};

				if (auth.configure) {
					if (app.conf.has('passport.' + authKey)) {
						conf = app.conf.get('passport.' + authKey);
					}

					options = auth.configure(conf);
				}

				passport.use(new auth.strategy(options, auth.verify.bind(auth, app)));
			}

			app.on('update:passport', function () {
				passport.unuse(authKey);
				setup();

				app.logger.info('removed %s passport strategy', authKey);
			});

			setup();
			app.logger.info('installed %s passport strategy', authKey);
		});
};
