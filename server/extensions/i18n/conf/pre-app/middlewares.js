import i18n from 'i18n';

export default function () {
	var app = this;

	app.use(i18n.init);

	app.logger.info('initialized i18n pre-app middlewares');
}
