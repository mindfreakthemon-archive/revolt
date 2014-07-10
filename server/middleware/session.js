var session = require('express-session'),
	RedisStore = require('connect-redis')(session),
	cookieParser = require('cookie-parser'),
	passport = require('passport');

module.exports = function (app) {
	app.use(cookieParser(app.conf.get('cookie:secret')));

	app.use(session({
		secret: app.conf.get('session:secret'),
		store: new RedisStore({
			client: app.db.redis,
			prefix: app.conf.get('session:prefix')
		}),
		cookie: {
			path: '/',
			httpOnly: true,
			secure: false,
			maxAge: app.conf.get('session:maxAge')
		},
		resave: false,
		saveUninitialized: false
	}));

	app.use(passport.initialize());
	app.use(passport.session());
};
