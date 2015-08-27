import i18n from 'i18n';
import express from 'express';

import inherit from 'core/helpers/express/inherit';

export default function () {
	var app = this,
		locales = app.conf.get('i18n.locales'),
		override = express();

	inherit.call(override, app);

	app.use(i18n.init);
	app.use(function (req, res, next) {
		var locale = req.baseUrl.slice(1);

		if (locales.indexOf(locale) !== -1) {
			req.setLocale(locale);
		}

		next();
	});

	override.use(locales.map(locale => '/:locale(' + locale + ')'), app);
	override.use('/', app);

	app.main = override;

	app.logger.info('initialized i18n pre-app middlewares');
}
