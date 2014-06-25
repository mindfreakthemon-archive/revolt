module.exports = function (app) {
	app.get('/', app.helpers.render('main/index'));
};
