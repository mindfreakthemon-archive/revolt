import fs from 'fs';

import express from 'express';

import bootable from 'bootable';
import { addPath } from 'app-module-path';
import requireDirectory from 'require-directory';

addPath(__dirname);

import inherit from './parts/core/lib/helpers/express/inherit';

const DEFAULT_MOUNT_PATH = '/';

export default function (app) {
	app.parts = require('fs').readdirSync(app.root + '/parts');

	var paths = [app.root + '/main'].concat(app.parts.map(extension => (app.root + '/parts/' + extension)));

	paths.forEach(path => app.phase(bootable.initializers(path + '/conf/init')));
	paths.forEach(path => app.phase(bootable.initializers(path + '/conf/pre-db', app)));
	paths.forEach(path => app.phase(bootable.initializers(path + '/conf/db', app)));
	paths.forEach(path => app.phase(bootable.initializers(path + '/conf/post-db', app)));
	paths.forEach(path => app.phase(bootable.initializers(path + '/services', app)));
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
