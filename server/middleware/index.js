var express = require('express'),
	helmet = require('helmet'),
	winston = require('winston'),
	passport = require('passport'),
	moment = require('moment');

module.exports = function (app) {
	app.use('/static', express.static('static'));

	helmet.defaults(app);

	app.require('./session');
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
