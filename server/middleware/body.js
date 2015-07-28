import bodyParser from 'body-parser';

module.exports = function (app) {
	app.use(bodyParser.urlencoded({
		extended: true
	}));

	app.use(bodyParser.json());
};
