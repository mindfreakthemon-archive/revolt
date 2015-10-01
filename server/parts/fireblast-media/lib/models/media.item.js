import mongoose from 'mongoose';

import MediaItemScheme from 'fireblast-media/lib/schemas/media.item';

MediaItemScheme.pre('save', function (next) {
	var item = this;

	if (item) {

	}

	next();
});

export default mongoose.model('MediaItem', MediaItemScheme);