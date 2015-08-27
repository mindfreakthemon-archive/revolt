import i18n from 'app/routes/i18n';

export default function () {
	var app = this;

	app.use('/i18n', i18n());

	app.logger.info('initialized i18n middlewares');
}
