import fs from 'fs';
import { Promise } from 'bluebird';

import { importer, initialize, mount } from 'fireblast-core/lib/helpers/setup';

const DEFAULT_MOUNT_PATH = '/';

export function setup(root) {
	var app = this;
	
	app.root = root;

	app.parts = fs.readdirSync(root + '/parts');

	var paths = [root + '/main'].concat(app.parts.map(part => (root + '/parts/' + part)));

	/**
	 * Core-only init
	 */
	paths.forEach(path => app.phase(initialize(path + '/app/core', app)));

	/**
	 *  Really low level init
	 */
	paths.forEach(path => app.phase(initialize(path + '/app/pre-init', app)));

	/**
	 * Loads config.json files from each part.
	 */
	paths.forEach(path => app.phase(importer(path + '/config.json', app)));

	/**
	 * Defaults initialization step.
	 */
	paths.forEach(path => app.phase(initialize(path + '/app/init', app)));

	/**
	 * Loading config.json file for this app.
	 */
	app.phase(importer(root + '/config.json', app));

	/**
	 * DB initialization step.
	 */
	paths.forEach(path => app.phase(initialize(path + '/app/pre-db', app)));
	paths.forEach(path => app.phase(initialize(path + '/app/db', app)));
	paths.forEach(path => app.phase(initialize(path + '/app/post-db', app)));

	/**
	 * Time to hook up to the any events available.
	 */
	paths.forEach(path => app.phase(initialize(path + '/app/services', app)));

	/**
	 * Application routes initialization step
	 */
	paths.forEach(path => app.phase(initialize(path + '/app/pre-routes', app)));
	paths.forEach(path => app.phase(mount(path + '/app/routes', app)));
	paths.forEach(path => app.phase(initialize(path + '/app/post-routes', app)));
}
