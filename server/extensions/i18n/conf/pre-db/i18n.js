import i18n from 'i18n';

export default function () {
	var app = this;

	i18n.configure({
		locales: app.conf.get('i18n.locales'),
		objectNotation: true,
		cookie: app.conf.get('i18n.name'),
		directory: app.root + '/extensions/i18n/locales'
	});

	app.logger.info('configured i18n module');
}
