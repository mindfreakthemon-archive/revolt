var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

module.exports = function (app) {
	var schema = Schema({
		identifier: String,
		provider: String,
		user: { type: Schema.Types.ObjectId, ref: 'User' }
	});

	app.models.Account = mongoose.model('Account', schema);
};
