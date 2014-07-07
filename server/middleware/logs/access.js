var	winston = require('winston'),
	logger = require('express-winston');

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
