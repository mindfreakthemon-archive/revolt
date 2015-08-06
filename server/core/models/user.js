import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import shortid from 'shortid';

const SALT_WORK_FACTOR = 10;

let schema = new mongoose.Schema({
	role: String,
	created: {
		type: Date,
		default: Date.now
	},
	name: String,
	email: String,

	accounts: [
		new mongoose.Schema({
			identifier: String,
			provider: String
		})
	],
	totp: {
		enabled: Boolean,
		key: String,
		period: String
	},
	local: {
		username: {
			type: String,
			index: { unique: true }
		},
		password: String
	}
});

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
	var User = this.model('User');

	User.findOne({
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

schema.statics.auth = function (req, provider, id, data, done) {
	var User = this.model('User');

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
			} else if (!user) {
				// it's a new user
				// or current user wants to attach a provider to his account
				user = req.user || new User();

				user.accounts.push({
					provider: provider,
					identifier: id
				});
			}

			user.save(done);
		});
};

export default mongoose.model('User', schema);