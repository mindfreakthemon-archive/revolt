import bootable from 'bootable';
import { addPath } from 'app-module-path';

export default function (app) {
	app.extensions = require('fs').readdirSync(app.root + '/extensions');

	var paths = [app.root + '/main'].concat(app.extensions.map(extension => (app.root + '/extensions/' + extension)));

	function iterate(callback) {
		paths
			.reverse()
			.forEach(callback);
	}

	iterate(path => addPath(path));
	iterate(path => app.phase(bootable.initializers(path + '/conf/init')));
	iterate(path => app.phase(bootable.initializers(path + '/conf/pre-db', app)));
	iterate(path => app.phase(bootable.initializers(path + '/conf/db', app)));
	iterate(path => app.phase(bootable.initializers(path + '/conf/post-db', app)));
	iterate(path => app.phase(bootable.initializers(path + '/conf/pre-app', app)));
	iterate(path => app.phase(bootable.routes(path + '/app/routes/index.js', app)));
	iterate(path => app.phase(bootable.initializers(path + '/conf/post-app', app)));
}
