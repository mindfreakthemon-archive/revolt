import passport from 'passport';
import User from 'core/models/user';

passport.serializeUser(function (user, done) {
	done(null, user.id);
});

passport.deserializeUser(function (id, done) {
	User.findById(id, done);
});

import * as GithubStrategy from 'core/passport/strategies/github';
import * as GoogleStrategy from 'core/passport/strategies/google';
import * as LocalStrategy from 'core/passport/strategies/local';
import * as TotpStrategy from 'core/passport/strategies/totp';

export default function () {
	var app = this;

	/**
	 * Here we include all of available strategies and
	 * iterate through them configuring each of them
	 */
	[GithubStrategy, GoogleStrategy, LocalStrategy, TotpStrategy]
		.forEach(function (auth) {
			var key = auth.KEY;

			function setup() {
				var options = {},
					conf = {};

				if (auth.configure) {
					if (app.conf.has('passport.' + key)) {
						conf = app.conf.get('passport.' + key);
					}

					options = auth.configure(conf);
				}

				passport.use(new auth.Strategy(options, auth.verify.bind(auth)));
			}

			app.on('update:passport', function () {
				passport.unuse(key);
				setup();

				app.logger.info('removed %s passport strategy', key);
			});

			setup();
			app.logger.info('installed %s passport strategy', key);
		});
}
