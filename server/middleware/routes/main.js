module.exports = function (app) {
	app.get('/', app.helpers.render('main/index'));
	app.get('/error', function () {
		throw Error('sad');
	});
};
