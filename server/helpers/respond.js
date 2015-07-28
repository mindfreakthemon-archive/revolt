module.exports = function (app) {
	app.helpers.respond = function (req, res, type, code, message, url) {
		res.format({
			html: function () {
				req.flash(type, message);

				res.redirect(url);
			},
			json: function () {
				res.send({
					status: type,
					code: code,
					message: message
				});
			}
		});
	};
};
