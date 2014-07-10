module.exports = function (app) {
	app.get('/', app.helpers.render('main/index'));
	app.get('/error', function () {
		throw Error('sad');
	});
	app.get('/lll', app.helpers.loggedInTotp('/auth/login', '/totp/verify'), function (req, res) {
		res.send({
			res: true
		})
	});
};
