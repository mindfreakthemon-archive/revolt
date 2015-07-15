module.exports = function (app, schema) {
	/**
	 * Authenticates current user or create account
	 * @param req
	 * @param provider
	 * @param id
	 * @param data
	 * @param done
	 */
	schema.statics.auth = function (req, provider, id, data, done) {
		app.models.User.findOne({
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
				} else if (!user) {
					// it's a new user
					// or current user wants to attach a provider to his account
					user = req.user || new app.models.User();

					user.accounts.push({
						provider: provider,
						identifier: id
					});
				}

				user.save(done);
			});
	};
};
