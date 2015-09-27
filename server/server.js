import bootable from 'bootable';
import express from 'express';
import setup from './setup';

var app = bootable(express());

app.db = {};
app.root = __dirname;
app.main = app;

setup(app);

app.boot(function (error) {
	if (error) {
		throw error;
	}

	app.logger.info('starting server on port %d', app.conf.get('core.port'));

	app.main.listen(app.conf.get('core.port'), function () {
		app.logger.info('server started on port %d', app.conf.get('core.port'));
	});
});
