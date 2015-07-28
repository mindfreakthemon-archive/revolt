import i18n from 'i18n';

module.exports = function (app) {
	i18n.configure({
		locales: ['en', 'ru'],
		objectNotation: true,
		directory: app.root + '/locales'
	});
};

