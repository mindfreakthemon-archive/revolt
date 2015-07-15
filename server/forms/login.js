var forms = require('forms'),
	fields = forms.fields,
	validators = forms.validators;

module.exports = function (app) {
	app.forms.login = forms.create({
		username: fields.string({ required: true }),
		password: fields.password({ required: validators.required('You definitely want a password') })
	});
};