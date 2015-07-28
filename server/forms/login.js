import forms from '../utils/forms';

module.exports = function (app) {
	app.forms.login = forms.create({
		username: app.fields.string({
			required: true
		}),
		password: app.fields.password({
			required: app.validators.required('You definitely want a password')
		})
	});
};