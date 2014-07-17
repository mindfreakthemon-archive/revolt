var app = require('express')();

require('./server/patch')(app);

app.set('views', './server/views');
app.set('view engine', 'jade');
app.set('view cache', process.env.NODE_ENV === 'production');
app.enable('case sensitive routing');
app.disable('x-powered-by');

app.require('./server/conf');
app.require('./server/models');
app.require('./server/helpers');
app.require('./server/middleware');

app.listen(app.conf.get('port'), function () {
	app.logger.info('server started on port %d', app.conf.get('port'));
});
