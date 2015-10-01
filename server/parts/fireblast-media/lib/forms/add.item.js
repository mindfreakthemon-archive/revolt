import Form from 'fireblast-forms/lib/forms/form';

export default class extends Form {
	get fields() {
		return {
			title: Form.fields.string({
				required: true
			}),
			body: Form.fields.string({
				required: true,
				widget: Form.widgets.textarea()
			})
		};
	}
}
