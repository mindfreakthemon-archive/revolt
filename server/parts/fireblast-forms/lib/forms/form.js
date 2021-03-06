import forms from 'forms';
import util from 'util';

import bootstrap from 'fireblast-forms/lib/forms/renderers/bootstrap';

export default class Form {
	constructor(request, response) {
		this.request = request;
		this.response = response;
		this.renderer = bootstrap;
		this.initialize();
	}

	initialize() {
		this.form = forms.create(this.fields);
		this.form.fields._csrf = Form.fields.string({
			required: true,
			widget: Form.widgets.hidden()
		});
	}

	render(data) {
		return this.bind(data).toHTML(this.renderer);
	}

	bind(data) {
		var _data = {};

		util._extend(_data, data || {});
		util._extend(_data, this.data || {});
		util._extend(_data, this.request.body || {});

		_data._csrf = this.request.csrfToken();

		return this.form.bind(_data);
	}

	validate(callback, data) {
		this.bind(data).validate(callback);
	}

	handle(callbacks) {
		this.form.handle(this.request, callbacks);
	}

	get fields() {
		return {};
	}

	set data(value) {
		this._data = value;
	}

	get data() {
		return this._data;
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
