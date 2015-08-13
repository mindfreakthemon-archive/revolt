export default function () {
	var app = this,
		basedir = app.root + '/app/views',
		views = [basedir];

	// enable "extend /layout"
	app.locals.basedir = basedir;

	app.extensions
		.reverse()
		.forEach(function (extension) {
			views.unshift(app.root + '/extensions/' + extension + '/app/views');
		});

	app.set('views', views);
	app.set('view engine', app.conf.get('express.engine'));
	app.set('view cache', app.conf.get('express.cache'));
	app.enable('case sensitive routing');
	app.disable('x-powered-by');

	app.logger.info('configured express variables');
};
