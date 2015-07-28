import express from 'express';
import helmet from 'helmet';
import csrf from 'csurf';
import i18n from 'i18n';

module.exports = function (app) {
	app.use('/static', express.static('static'));

	helmet(app);

	app.require('./body');
	app.require('./session');

	/* jshint unused:false */
	app.use(function (req, res, next) {
		/**
		 * @type {function(type:String, code:Number, message:String, url:String)}
		 */
		res.respond = app.helpers.respond.bind(null, req, res);

		res.locals.flash = req.flash.bind(req);
		res.locals.user = req.user;
		res.locals.session = req.session;
		res.locals.request = req;
		res.locals.response = res;
		res.locals.app = app;

		next();
	});

	app.use(i18n.init);
	app.use(csrf());

	app.require('./access');
	app.require('../routes');
	app.require('./error');

	app.use(function (req, res) {
		res.status(404);

		res.render('error', {
			code: 404
		});
	});

	app.use(function (error, req, res, next) {
		res.status(error.errorCode || 500);

		res.render('error', {
			code: error.errorCode,
			error: error.msg
		});
	});
};
