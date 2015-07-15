var forms = require('forms'),
	fields = forms.fields,
	validators = forms.validators;

module.exports = function (app) {
	app.forms.registration = forms.create({
		username: fields.string({
			required: true,
			validators: [
				app.validators.unique(app.models.User, 'local.username')]

		}),
		password: fields.password({ required: validators.required() }),
		confirm: fields.password({
			required: true,
			validators: [
				validators.matchField('password')
			]
		}),
		email: fields.email({
			validators: [
				app.validators.unique(app.models.User, 'email')
			]
		})
	});
};