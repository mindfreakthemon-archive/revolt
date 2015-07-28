import winston from 'winston';
import logger from 'express-winston';

module.exports = function (app) {
	app.use(logger.errorLogger({
		transports: [
			new winston.transports.Console({
				json: true,
				colorize: true
			})
		]
	}));
};
