import resolveForm from 'fireblast-forms/lib/helpers/forms/resolveForm';

export default function () {
	var app = this;

	app.use(function (req, res, next) {
		res.locals.resolveForm = resolveForm.bind(app, req, res);

		next();
	});

	app.logger.info('initialized forms pre-app middlewares');
}
