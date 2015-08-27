export default function (req, res, form) {
	var Form = require(form);

	return new Form(req, res);
}
