import winston from 'winston';

export default function () {
	var app = this;

	app.logger = winston;

	winston.remove(winston.transports.Console);

	winston.add(winston.transports.Console, {
		colorize: true
	});
}
