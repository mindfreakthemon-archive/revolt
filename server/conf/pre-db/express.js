export default function () {
	var app = this;

	app.set('views', app.conf.get('express.views'));
	app.set('view engine', app.conf.get('express.engine'));
	app.set('view cache', app.conf.get('express.cache'));
	app.enable('case sensitive routing');
	app.disable('x-powered-by');

	app.logger.info('configured express variables');
};
