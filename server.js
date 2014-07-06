var app = require('express')();

require('./server/require')(app);

app.helpers	= {};
app.models = {};
app.db = {};
app.conf = {};
app.logger = {};

app.require('./server/conf');
app.require('./server/models');
app.require('./server/helpers');
app.require('./server/middleware');
//app.require('./server/nock');

app.listen(app.conf.get('port'), function () {
	app.logger.info('server started on port %d', app.conf.get('port'));
});
