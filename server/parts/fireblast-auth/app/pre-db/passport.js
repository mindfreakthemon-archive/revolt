import passport from 'passport';

import * as GithubStrategy from 'fireblast-auth/lib/passport/github';
import * as ImgurStrategy from 'fireblast-auth/lib/passport/imgur';
import * as GoogleStrategy from 'fireblast-auth/lib/passport/google';
import * as LocalStrategy from 'fireblast-auth/lib/passport/local';
import * as TotpStrategy from 'fireblast-auth/lib/passport/totp';

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

				app.logger.debug('removed %s passport strategy', key);
			});

			setup();
			app.logger.debug('installed %s passport strategy', key);
		});
}
