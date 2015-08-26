import express from 'express';
import helmet from 'helmet';
import csrf from 'csurf';
import flash from 'connect-flash';
import passport from 'passport';
import bodyParser from 'body-parser';
import winston from 'winston';
import logger from 'express-winston';
import connectRedis from 'connect-redis';
import session from 'express-session';
import cookieParser from 'cookie-parser';

import respond from 'core/helpers/utils/respond';

export default function () {
	var app = this,
		store = null;

	app.use('/', express.static('client', {
		fallthrough: true,
		maxAge: 5
	}));

	helmet(app);

	app.use(bodyParser.urlencoded({
		extended: true
	}));

	app.use(bodyParser.json());

	app.use(cookieParser(app.conf.get('cookie.secret')));

	switch (app.conf.get('session.store')) {
		case 'redis':
			if (!app.db.redis) {
				app.logger.warn('session is configured to be stored in redis, but no redis instance is defined');
				break;
			}

			app.logger.info('session is configured to be stored in redis');

			store = new (connectRedis(session))({
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

	/* jshint unused:false */
	app.use(function (req, res, next) {
		/**
		 * @type {function(type:String, code:Number, message:String, url:String)}
		 */
		res.respond = respond.bind(null, req, res);

		res.locals.flash = req.flash.bind(req);

		res.locals.user = req.user;
		res.locals.session = req.session;
		res.locals.request = req;
		res.locals.response = res;
		res.locals.app = app;

		next();
	});

	app.use(csrf());

	app.use(logger.logger({
		transports: [
			new winston.transports.Console({
				json: false,
				colorize: true
			})
		]
	}));

	app.logger.info('initialized pre-app middlewares');
}
