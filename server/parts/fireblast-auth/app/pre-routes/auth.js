import passport from 'passport';

import Guest from 'fireblast-auth/lib/models/guest';

export default function () {
	var app = this;

	app.use(passport.initialize());
	app.use(passport.session());

	app.use(function (req, res, next) {
		if (!req.user) {
			req.user = new Guest();
		}

		res.locals.user = req.user;
		next();
	});

	app.logger.debug('initialized auth pre-routes configuration');
}

