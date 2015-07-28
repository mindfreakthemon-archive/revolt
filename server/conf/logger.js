import winston from 'winston';

module.exports = function (app) {
	app.logger = winston;

	winston.remove(winston.transports.Console);

	winston.add(winston.transports.Console, {
		colorize: true
	});
};
