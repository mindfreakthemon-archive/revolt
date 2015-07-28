import connectRedis from 'connect-redis';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import flash from 'connect-flash';

var RedisStore = connectRedis(session);

module.exports = function (app) {
	var store = null; // MemoryStore by default

	app.use(cookieParser(app.conf.get('cookie.secret')));

	switch (app.conf.get('session.store')) {
		case 'redis':
			if (!app.db.redis) {
				app.logger.warn('session is configured to be stored in redis, but no redis instance is defined');
				break;
			}

			app.logger.info('session is configured to be stored in redis');

			store = new RedisStore({
				client: app.db.redis,
				prefix: app.conf.get('session.prefix')
			});

			break;
	}

	if (!store) {
		app.logger.warn('session is configured to be stored in memory');
	}

	app.use(session({
		secret: app.conf.get('session.secret'),
		store: store,
		cookie: {
			path: app.conf.get('session.path'),
			httpOnly: app.conf.get('session.httpOnly'),
			secure: app.conf.get('session.secure'),
			maxAge: app.conf.get('session.maxAge')
		},
		resave: false,
		saveUninitialized: false
	}));

	app.use(flash());

	app.use(passport.initialize());
	app.use(passport.session());
};
