import { addPath } from 'app-module-path';

addPath(__dirname);
addPath(__dirname + '/parts');

let { app } = require('fireblast-core/entity/app');

app.setup(__dirname);

app.boot()
	.then(() => {
		app.logger.info('starting server on port %d', app.conf.get('core.port'));

		app.main.listen(app.conf.get('core.port'), function () {
			app.logger.info('server started on port %d', app.conf.get('core.port'));
		});
	});
