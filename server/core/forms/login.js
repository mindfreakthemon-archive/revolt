import Form from 'core/forms/form.js'

export default class extends Form {
	constructor(request, response) {
		super({
			username: Form.fields.string({
				required: true
			}),
			password: Form.fields.password({
				required: Form.validators.required('You definitely want a password')
			})
		}, request, response);
	}
}