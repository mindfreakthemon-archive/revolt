var app = require('express')();

require('./server/patch')(app);

app.require('./server/conf');
app.require('./server/models');
app.require('./server/helpers');
app.require('./server/middleware');

app.listen(app.conf.get('port'), function () {
	app.logger.info('server started on port %d', app.conf.get('port'));
});
