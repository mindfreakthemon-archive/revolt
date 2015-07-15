var app = require('express')();

require('./patch')(app);

app.require('./conf');
app.require('./models');

app.require('./validators');
app.require('./forms');

app.require('./helpers');
app.require('./middleware');

app.listen(app.conf.get('port'), function () {
	app.logger.info('server started on port %d', app.conf.get('port'));
});
