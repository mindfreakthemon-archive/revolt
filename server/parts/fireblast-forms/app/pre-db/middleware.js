import resolveForm from 'fireblast-forms/lib/helpers/forms/resolveForm';

export default function () {
	var app = this;

	app.use((req, res, next) => {
		res.locals.resolveForm = resolveForm.bind(app, req, res);

		next();
	});

	app.logger.debug('initialized forms pre-app middlewares');
}
