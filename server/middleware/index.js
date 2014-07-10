var express = require('express'),
	helmet = require('helmet');

module.exports = function (app) {
	app.use('/static', express.static('static'));

	helmet.defaults(app);

	app.require('./body');
	app.require('./session');

	app.use(function (req, res, next) {
		res.locals.user = req.user;
		res.locals.session = req.session;
		res.locals.request = req;
		res.locals.response = res;
		next();
	});

	app.require('./logs/access');
	app.require('./routes');
	app.require('./logs/error');

	app.use(function (req, res) {
		res.status(404);

		res.render('error', {
			code: 404
		});
	});

	app.use(function (err, req, res, next) {
		res.render('error', {
			code: 500,
			error: err
		});
	});
};
