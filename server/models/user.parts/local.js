import bcrypt from 'bcrypt';
import shortid from 'shortid';

const SALT_WORK_FACTOR = 10;

/**
 * Password support. Methods for hashing newly added passwords and for validating password.
 */
module.exports = function (app, schema) {
	schema.pre('save', function (next) {
		var user = this;

		if (!user.isModified('local.password')) {
			return next();
		}

		// generate a salt
		bcrypt.genSalt(SALT_WORK_FACTOR, function (error, salt) {
			if (error) {
				return next(error);
			}

			// hash the password along with our new salt
			bcrypt.hash(user.local.password, salt, function (error, hash) {
				if (error) {
					return next(error);
				}

				// override the cleartext password with the hashed one
				user.local.password = hash;
				next();
			});
		});
	});

	schema.pre('save', function (next) {
		var user = this;

		if (user.local.username) {
			return next();
		}

		user.local.username = user._id + shortid.generate();
		next();
	});

	schema.statics.login = function (username, password, callback) {
		app.models.User.findOne({
				'local.username': username
			},
			function (error, user) {
				if (error) {
					return callback(error);
				}

				if (!user) {
					return callback(null, false);
				}

				user.validatePassword(password, function (error, isMatch) {
					callback(!isMatch, user);
				});
			});
	};

	schema.methods.validatePassword = function (pasword, callback) {
		bcrypt.compare(pasword, this.local.password, function (error, isMatch) {
			if (error) {
				return callback(error);
			}

			callback(null, isMatch);
		});
	};
};
