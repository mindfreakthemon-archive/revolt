var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

module.exports = function (app) {
	var schema = Schema({
		role: String,
		created: { type: Date, default: Date.now },
		name: String,
		email: String,

		accounts: [{ type: Schema.Types.ObjectId, ref: 'Account' }],
		secondFactors: [{ type: Schema.Types.ObjectId, ref: 'SecondFactor' }]
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
		function callback(error, user) {
			if (error) {
				done(error);
				return;
			}

			var account = new app.models.Account();

			account.provider = provider;
			account.identifier = id;
			account.user = user.id;

			account.save(function () {
				user.accounts.push(account.id);
				user.save(done);
			});
		}

		app.models.Account
			.findOne({
				identifier: id,
				provider: provider
			},
			function (error, account) {
				console.log(error, account);
				if (error) {
					done(error);
					return;
				}

				if (account) {
					if (account.user.toString() === req.user.id.toString()) {
						done(null, req.user);
					} else {
						User.findById(account.user, callback);
					}
				} else {
					callback(null, req.user || new User());
				}
			});
	};

	schema.post('remove', function (user) {
		console.log('user was removed');

		user.accounts
			.forEach(function (account) {
				console.log('removing account');

				app.models.Account.remove(account.id || account);
			});
	});

	var User = app.models.User = mongoose.model('User', schema);
};
