export default function (req, res, extension, form) {
	var Form = require(extension + '/lib/forms/' + form).default;

	return new Form(req, res);
}
