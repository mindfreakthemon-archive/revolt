import Form from 'parts/forms/lib/forms/form';

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