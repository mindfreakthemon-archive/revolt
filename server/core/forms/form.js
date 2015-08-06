import forms from 'forms';

export default class Form {
	constructor(fields, request, response) {
		this.form = forms.create(fields);

		this.request = request;
		this.response = response;
		this.initialize();
	}

	initialize() {
		this.form.fields._csrf = Form.fields.string({
			required: true,
			widget: Form.widgets.hidden()
		})
	}

	render(data) {
		data = data || {};

		data._csrf = this.request.csrfToken();

		return this.form.bind(data).toHTML();
	}

	handle(callbacks) {
		this.form.handle(this.request, callbacks);
	}

	static get validators() {
		return forms.validators;
	}

	static get fields() {
		return forms.fields;
	}

	static get widgets() {
		return forms.widgets;
	}
}
