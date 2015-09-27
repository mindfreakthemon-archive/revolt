import fs from 'fs';

import express from 'express';

import bootable from 'bootable';
import { addPath } from 'app-module-path';
import requireDirectory from 'require-directory';

addPath(__dirname);
addPath(__dirname + '/parts');

import inherit from './parts/fireblast-core/lib/helpers/express/inherit';
import importer from './parts/fireblast-core/lib/helpers/express/importer';

const DEFAULT_MOUNT_PATH = '/';

export default function (app) {
	app.parts = require('fs').readdirSync(app.root + '/parts');

	var paths = [app.root + '/main'].concat(app.parts.map(part => (app.root + '/parts/' + part)));

	/**
	 * Really low level initialization.
	 * Should not be used in any part rather than core.
	 */
	paths.forEach(path => app.phase(bootable.initializers(path + '/app/pre-init', app)));

	/**
	 * Loads default.config.json files from each part.
	 */
	paths.forEach(path => app.phase(importer(path + '/default.config.json', app)));

	/**
	 * Defaults initialization step.
	 */
	paths.forEach(path => app.phase(bootable.initializers(path + '/app/init', app)));

	/**
	 * Loading config.json file for this app.
	 */
	app.phase(importer(app.root + '/config.json', app));

	/**
	 * DB initialization step.
	 */
	paths.forEach(path => app.phase(bootable.initializers(path + '/app/pre-db', app)));
	paths.forEach(path => app.phase(bootable.initializers(path + '/app/db', app)));
	paths.forEach(path => app.phase(bootable.initializers(path + '/app/post-db', app)));

	/**
	 * Time to hook up to the any events available.
	 */
	paths.forEach(path => app.phase(bootable.initializers(path + '/app/services', app)));

	/**
	 * Application routes initialization step
	 */
	paths.forEach(path => app.phase(bootable.initializers(path + '/app/pre-routes', app)));
	paths.forEach(path => app.phase(function () {
		if (!fs.existsSync(path + '/app/routes')) {
			return;
		}

		requireDirectory(module, path + '/app/routes', {
			visit: function (route) {
				var router = express();

				router.on('mount', inherit);
				router.on('mount', route.default.bind(app, router));

				app.use(route.MOUNT_PATH || DEFAULT_MOUNT_PATH, router);
			}
		});
	}));
	paths.forEach(path => app.phase(bootable.initializers(path + '/app/post-routes', app)));
}
