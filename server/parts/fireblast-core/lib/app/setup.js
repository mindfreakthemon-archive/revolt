import fs from 'fs';

import express from 'express';

import bootable from 'bootable';

import inherit from 'fireblast-core/lib/helpers/express/inherit';
import importer from 'fireblast-core/lib/helpers/setup/importer';
import walker from 'fireblast-core/lib/helpers/setup/walker';

const DEFAULT_MOUNT_PATH = '/';

export default function () {
	var app = this;

	app.parts = fs.readdirSync(app.root + '/parts');

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
	paths.forEach(path => app.phase(walker(path + '/app/routes', (route) => {
		var router = express();

		app.logger.debug('loading %s module: %s', path, route.MOUNT_PATH);

		router.on('mount', inherit);
		router.on('mount', route.default.bind(app, router));

		app.use(route.MOUNT_PATH || DEFAULT_MOUNT_PATH, router);
	})));
	paths.forEach(path => app.phase(bootable.initializers(path + '/app/post-routes', app)));
}
