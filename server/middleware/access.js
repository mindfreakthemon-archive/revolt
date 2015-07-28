import winston from 'winston';
import logger from 'express-winston';

module.exports = function (app) {
	app.use(logger.logger({
		transports: [
			new winston.transports.Console({
				json: false,
				colorize: true
			})
		]
	}));
};
