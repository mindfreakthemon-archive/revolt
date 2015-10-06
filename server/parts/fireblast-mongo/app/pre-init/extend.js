/* jshint unused:false */
import mongoose from 'mongoose';
import extend from 'mongoose-schema-extend';
import paginate from 'mongoose-paginate';
import bluebird from 'bluebird';

export default function () {
	var app = this;

	mongoose.Promise = bluebird;

	mongoose.plugin(paginate);

	app.logger.info('loaded mongoose extension');
}
