import auth from 'app/routes/auth';
import totp from 'app/routes/totp';
import registration from 'app/routes/registration';

export default function () {
	var app = this;

	app.use('/auth', auth());
	app.use('/registration', registration());
	app.use('/totp', totp());

	app.logger.info('initialized auth middlewares');
}
