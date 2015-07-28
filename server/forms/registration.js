import forms from '../utils/forms';

module.exports = function (app) {
	app.forms.registration = forms.create({
		username: app.fields.string({
			required: true,
			validators: [
				app.validators.unique(app.models.User, 'local.username')
			]
		}),
		password: app.fields.password({
			required: app.validators.required()
		}),
		confirm: app.fields.password({
			required: true,
			validators: [
				app.validators.matchField('password')
			]
		}),
		email: app.fields.email({
			validators: [
				app.validators.unique(app.models.User, 'email')
			]
		})
	});
};