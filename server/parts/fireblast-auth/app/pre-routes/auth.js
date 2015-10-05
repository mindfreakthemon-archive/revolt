import passport from 'passport';

export default function () {
	var app = this;

	app.use(passport.initialize());
	app.use(passport.session());

	app.use(function (req, res, next) {
		res.locals.user = req.user;
		next();
	});

	app.logger.debug('initialized auth pre-routes configuration');
}

