import mongoose from 'mongoose';
import shortid from 'shortid';

let MediaItemScheme = new mongoose.Schema({
	_id: {
		type: String,
		unique: true,
		'default': shortid.generate
	},

	created: {
		type: Date,
		default: Date.now
	},

	updated: {
		type: Date,
		default: Date.now
	},

	title: String,

	body: String,

	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},

	meta: {
		views: Number
	}
}, { discriminatorKey: '_type' });

export let MODEL_NAME = 'MediaItem';

export default MediaItemScheme;
