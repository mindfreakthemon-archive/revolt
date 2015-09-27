export default function (name, object) {
	if (!Array.isArray(object.widget.classes)) {
		object.widget.classes = [];
	}

	if (object.widget.classes.indexOf('form-control') === -1) {
		object.widget.classes.push('form-control');
	}

	//var label = object.labelHTML(name);
	var error = object.error ? '<div class="alert alert-error help-block">' + object.error + '</div>' : '';

	object.widget.attrs = {
		placeholder: name
	};

	var validationclass = object.value && !object.error ? 'has-success' : '';
	validationclass = object.error ? 'has-error' : validationclass;

	var widget = object.widget.toHTML(name, object);
	return '<div class="form-group ' + validationclass + '">' + widget + error + '</div>';
}