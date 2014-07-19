var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

module.exports = function (app) {
	var schema = Schema({
		role: String,
		created: { type: Date, default: Date.now },
		name: String,
		email: String,

		accounts: [
			Schema({
				identifier: String,
				provider: String
			})
		],
		totp: {
			enabled: Boolean,
			key: String,
			period: String
		}
	});

	/**
	 * Authenticates current user or create account
	 * @param req
	 * @param provider
	 * @param id
	 * @param data
	 * @param done
	 */
	schema.statics.auth = function (req, provider, id, data, done) {
		User.findOne({
			'accounts.identifier': id,
			'accounts.provider': provider
		},
		function (error, user) {
			if (error) {
				done(error);
				return;
			}

			if (user && req.user) {
				// if req.user is user
				// then it's not an initial log in
				// otherwise req.user is trying to steal
				// an account from user
				done(!user.equals(req.user), req.user);
				return;
			}

			user = user || req.user || new User();

			user.accounts.push({
				provider: provider,
				identifier: id
			});

			user.save(done);
		});
	};

	var User = app.models.User = mongoose.model('User', schema);
};
