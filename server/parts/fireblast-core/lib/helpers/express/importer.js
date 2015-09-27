import path from 'path';
import fs from 'fs';

export default function (file, app) {
	return function () {
		if (fs.existsSync(file)) {
			app.conf.loadFile(file);
		}
	}
}