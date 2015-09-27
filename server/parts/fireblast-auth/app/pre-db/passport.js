import passport from 'passport';
import User from 'fireblast-auth/lib/models/user';

import * as GithubStrategy from 'fireblast-auth/lib/passport/strategies/github';
import * as ImgurStrategy from 'fireblast-auth/lib/passport/strategies/imgur';
import * as GoogleStrategy from 'fireblast-auth/lib/passport/strategies/google';
import * as LocalStrategy from 'fireblast-auth/lib/passport/strategies/local';
import * as TotpStrategy from 'fireblast-auth/lib/passport/strategies/totp';

passport.serializeUser(function (user, done) {
	done(null, user.id);
});

passport.deserializeUser(function (id, done) {
	User.findById(id, done);
});

export default function () {
	var app = this;

	/**
	 * Here we include all of available strategies and
	 * iterate through them configuring each of them
	 */
	[GithubStrategy, ImgurStrategy, GoogleStrategy, LocalStrategy, TotpStrategy]
		.forEach(function (auth) {
			var key = auth.KEY;

			function setup() {
				var options = {},
					conf = {};

				if (auth.configure) {
					if (app.conf.has('auth.passport.' + key)) {
						conf = app.conf.get('auth.passport.' + key);
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
