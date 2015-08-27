import Form from 'core/forms/form';

export default class extends Form {
	constructor(request, response) {
		super(request, response);

		this.data = {
			locale: request.getLocale()
		};
	}

	get fields() {
		var choices = {};

		this.request.app.conf.get('i18n.locales')
			.forEach(locale => choices[locale] = locale);

		return {
			locale: Form.fields.string({
				required: true,
				choices: choices,
				widget: Form.widgets.select()
			})
		};
	}
}