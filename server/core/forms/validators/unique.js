export default function (schema, path, message) {
	message = message || 'This name is already taken.';

	return function (form, field, callback) {
		var data = {};

		data[path] = form.data[field.name];

		schema.findOne(data, function (error, model) {
			if (error) {
				callback(error);
				return;
			}

			if (model) {
				callback(message);
			} else {
				callback();
			}
		});
	};
};