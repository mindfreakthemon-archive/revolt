import mongoose from 'mongoose';
import shortid from 'shortid';

export default new mongoose.Schema({
	_id: {
		type: String,
		unique: true,
		'default': shortid.generate
	},

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
}, { discriminatorKey: '_type' });