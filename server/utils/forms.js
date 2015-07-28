var forms = require('forms'),
	fields = forms.fields,
	widgets = forms.widgets;

var create = forms.create;

forms.create = function (map) {
	map._csrf = fields.string({
		required: true,
		widget: widgets.hidden()
	});

	var form = create.apply(this, arguments);

	form.render = function (data) {
		data = data || {};

		return form.bind(data).toHTML();
	};

	return form;
};

module.exports = forms;