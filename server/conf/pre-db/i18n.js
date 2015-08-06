import i18n from 'i18n';

export default function () {
	var app = this;

	i18n.configure({
		locales: ['en', 'ru'],
		objectNotation: true,
		directory: app.root + '/locales'
	});

	app.logger.info('configured i18n module');
};

