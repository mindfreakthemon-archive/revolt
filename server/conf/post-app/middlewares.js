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

	app.logger.info('initialized post-app middlewares');
};
