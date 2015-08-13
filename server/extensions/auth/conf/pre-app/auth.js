import LoginForm from 'core/forms/login.header';

export default function () {
	var app = this;

	app.use(function (req, res, next) {
		//if (!req.user) {
		res.locals.login = new LoginForm(req, res);
		//}

		next();
	});

	app.logger.info('initialized auth pre-app configuration');
};
