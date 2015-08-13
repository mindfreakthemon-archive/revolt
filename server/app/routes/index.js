import main from 'app/routes/main';

export default function () {
	var app = this;

	app.use('/', main());

	app.logger.info('initialized main middlewares');
};
