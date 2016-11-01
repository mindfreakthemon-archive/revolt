import fs from 'fs';
import express from 'express';
import mongoose from 'mongoose';
import requireDirectory from 'require-directory';
import { Promise } from 'bluebird';

import inherit from 'fireblast-core/lib/helpers/express/inherit';


export function walker(path, iteratee) {
	return () => new Promise((resolve, reject) => {
		fs.exists(path, exists => {
			if (exists) {
				Promise
					.props(requireDirectory(module, path, { visit: iteratee }))
					.then(resolve);
			} else {
				resolve();
			}
		});
	});
}

export function importer(path, app) {
	return () => new Promise((resolve, reject) => {
		fs.exists(path, exists => {
			if (exists) {
				app.conf.loadFile(file);
			}
		})
	});
}

export function initialize(path, app) {
	return walker(path, part => part.default && part.default.call(app));
}

export function mount(path, app) {
	return walker(path + '/app/routes', route => {
		let router = express();

		app.logger.debug('loading %s module: %s', path, route.MOUNT_PATH);

		router.on('mount', inherit);
		router.on('mount', route.default.bind(app, router));

		app.use(route.MOUNT_PATH || DEFAULT_MOUNT_PATH, router);
	});
}

export function models(path, app) {
	return walker(path + '/lib/schemas', schema => {
		app.model[schema.MODEL_NAME] = mongoose.model(schema.MODEL_NAME, schema.default);
	});
}
