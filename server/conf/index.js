module.exports = function (app) {
	app.require('./logger');
	app.require('./conf');
	app.require('./ext');
	app.require('./db');
	app.require('./passport');
};
