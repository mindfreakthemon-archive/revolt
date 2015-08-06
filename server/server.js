var bootable = require('bootable');
var express = require('express');

var app = bootable(express());

app.db = {};
app.root = __dirname;

require('app-module-path').addPath(app.root);

app.phase(bootable.initializers(app.root + '/conf/init', app));
app.phase(bootable.initializers(app.root + '/conf/pre-db', app));
app.phase(bootable.initializers(app.root + '/conf/db', app));
app.phase(bootable.initializers(app.root + '/conf/post-db', app));

app.phase(bootable.routes(app.root + '/app/middleware/index.js', app));

app.boot(function (error) {
	if (error) {
		throw error;
	}

	app.listen(app.conf.get('port'), function () {
		app.logger.info('server started on port %d', app.conf.get('port'));
	});
});
