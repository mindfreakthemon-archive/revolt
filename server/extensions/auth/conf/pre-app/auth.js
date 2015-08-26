import passport from 'passport';

import LoginForm from 'core/forms/login.header';

export default function () {
	var app = this;

	app.use(passport.initialize());
	app.use(passport.session());

	app.use(function (req, res, next) {
		res.locals.user = req.user;

		//if (!req.user) {
		res.locals.login = new LoginForm(req, res);
		//}

		next();
	});

	app.logger.info('initialized auth pre-app configuration');
}

