import mongoose from 'mongoose';

export default function (modelName, path, message) {
	var model = mongoose.model(modelName);

	message = message || 'This name is already taken.';

	return function (form, field, callback) {
		var data = {};

		data[path] = form.data[field.name];

		model.findOne(data, function (error, model) {
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
}
