import convict from 'convict';
import path from 'path';

function pruneEmptyKeys(obj) {
	for (let key of Object.keys(obj)) {
		if (obj[key] === null || obj[key] === undefined) {
			delete obj[key];
		} else if (typeof obj[key] === 'object') {
			pruneEmptyKeys(obj[key]);
		}
	}
}

export default function () {
	var app = this,
		schema = require(path.resolve(app.root, 'schema.config.json')),
		conf = app.conf = app.locals.conf = convict(schema);

	conf.loadDefaultsFile = function (path) {
		var _config = this.getProperties();

		pruneEmptyKeys(_config);

		this.loadFile(path);
		this.load(_config);
	};

	conf.loadDefaults = function (data) {
		var _config = this.getProperties();

		pruneEmptyKeys(_config);

		this.load(data);
		this.load(_config);
	};
}
