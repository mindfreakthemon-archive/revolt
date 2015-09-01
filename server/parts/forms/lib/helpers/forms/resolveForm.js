export default function (req, res, extension, form) {
	var Form = require('parts/' + extension + '/lib/forms/' + form);

	return new Form(req, res);
}
