export default function () {
	var app = this;

	app.use(function (req, res) {
		res.status(404);

		res.render('error', {
			code: 404
		});
	});
}