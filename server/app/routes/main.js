import express from 'express';

import inherit from 'core/helpers/express/inherit';
import render from 'core/helpers/utils/render';
import loggedInTotp from 'core/helpers/totp/loggedInTotp';

import LoginForm from 'core/forms/login';
import RegistrationForm from 'core/forms/registration';

export default function () {
	var router = express();

	router.on('mount', inherit);

	router.get('/', function (req, res) {
		res.render('main/index', {
			loginForm: new LoginForm(req, res),
			registrationForm: new RegistrationForm(req, res)
		});
	});

	router.get('/error', function () {
		throw Error('sad');
	});

	//router.get('/lll', loggedInTotp('/auth/login', '/totp/verify'), function (req, res) {
	//	res.send({
	//		res: true
	//	});
	//});

	return router;
}