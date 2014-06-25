var app = require('express')();

require('./server/require')(app);

app.helpers	= {};
app.models = {};
app.db = {};

app.require('./server/conf');
app.require('./server/init');
app.require('./server/model');
app.require('./server/models');
app.require('./server/auth');
app.require('./server/helpers');
app.require('./server/middleware');
app.require('./server/nock');

app.listen(process.env.PORT || app.conf.get('port'));
