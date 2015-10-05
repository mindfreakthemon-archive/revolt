import fs from 'fs';
import requireDirectory from 'require-directory';

export default function (path, iteratee) {
	return function () {
		if (!fs.existsSync(path)) {
			return;
		}

		requireDirectory(module, path, {
			visit: iteratee
		});
	};
}