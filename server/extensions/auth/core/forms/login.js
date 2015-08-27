import Form from 'core/forms/form';

export default class extends Form {
	constructor(request, response) {
		super({
			username: Form.fields.string({
				required: true
			}),
			password: Form.fields.password({
				required: Form.validators.required()
			})
		}, request, response);
	}
}