import Form from 'core/forms/form';

export default class extends Form {
	constructor(request, response) {
		var choices = {};

		request.app.conf.get('i18n.locales')
			.forEach(locale => choices[locale] = locale);

		super({
			locale: Form.fields.string({
				required: true,
				choices: choices,
				widget: Form.widgets.select()
			})
		}, request, response);
	}
}