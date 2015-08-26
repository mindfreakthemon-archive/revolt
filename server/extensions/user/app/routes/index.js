import user from 'app/routes/user';

export default function () {
	var app = this;

	app.use('/user', user());

	app.logger.info('initialized user middlewares');
}
