import Form from 'core/forms/form.js';

export default class extends Form {
	get fields() {
		return {
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
		};
	}
}