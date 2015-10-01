import winston from 'winston';
import logger from 'express-winston';

export default function () {
	var app = this;

	app.use(logger.errorLogger({
		transports: [
			new winston.transports.Console({
				json: true,
				colorize: true
			})
		]
	}));

	/* jshint unused:false */
	app.use(function (error, req, res, next) {
		res.status(error.httpCode || error.errorCode || 500);

		res.render('error', {
			error: error
		});
	});
}
