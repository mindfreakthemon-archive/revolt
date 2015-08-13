import Form from 'core/forms/form.js'

export default class extends Form {
	constructor(request, response) {
		super({
			key: Form.fields.string({
				required: true,
				widget: Form.widgets.hidden()
			}),
			period: Form.fields.string({
				required: true,
				widget: Form.widgets.hidden()
			}),
			code: Form.fields.string({
				required: true
			})
		}, request, response);
	}
}