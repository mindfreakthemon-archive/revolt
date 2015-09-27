import fs from 'fs';

import express from 'express';

import bootable from 'bootable';
import { addPath } from 'app-module-path';
import requireDirectory from 'require-directory';

addPath(__dirname);

import inherit from './parts/core/lib/helpers/express/inherit';
import importer from './parts/core/lib/helpers/express/importer';

const DEFAULT_MOUNT_PATH = '/';

export default function (app) {
	app.parts = require('fs').readdirSync(app.root + '/parts');

	var paths = [app.root + '/main'].concat(app.parts.map(extension => (app.root + '/parts/' + extension)));

	/**
	 * Really low level initialization.
	 * Should not be used in any part rather than core.
	 */
	paths.forEach(path => app.phase(bootable.initializers(path + '/pre-init', app)));

	/**
	 * Loads default.config.json files from each part.
	 */
	paths.forEach(path => app.phase(importer(path + '/default.config.json', app)));

	/**
	 * Defaults initialization step.
	 */
	paths.forEach(path => app.phase(bootable.initializers(path + '/init', app)));

	/**
	 * Loading config.json file for this app.
	 */
	app.phase(importer(app.root + '/config.json', app));

	/**
	 * DB initialization step.
	 */
	paths.forEach(path => app.phase(bootable.initializers(path + '/conf/pre-db', app)));
	paths.forEach(path => app.phase(bootable.initializers(path + '/db', app)));
	paths.forEach(path => app.phase(bootable.initializers(path + '/conf/post-db', app)));

	/**
	 * Time to hook up to the any events available.
	 */
	paths.forEach(path => app.phase(bootable.initializers(path + '/services', app)));

	/**
	 * Application routes initialization step
	 */
	paths.forEach(path => app.phase(bootable.initializers(path + '/conf/pre-app', app)));
	paths.forEach(path => app.phase(function () {
		if (!fs.existsSync(path + '/routes')) {
			return;
		}

		requireDirectory(module, path + '/routes', {
			visit: function (route) {
				var router = express();

				router.on('mount', inherit);
				router.on('mount', route.default.bind(app, router));

				app.use(route.MOUNT_PATH || DEFAULT_MOUNT_PATH, router);
			}
		});
	}));
	paths.forEach(path => app.phase(bootable.initializers(path + '/conf/post-app', app)));
}
