var app = require('express')();

require('./patch')(app);

app.root = __dirname;

app.load();

app.listen(app.conf.get('port'), function () {
	app.logger.info('server started on port %d', app.conf.get('port'));
//return;
//	app.mailer.send('email/test', {
//		to: 'mfthemon@gmail.com',
//		subject: 'Test Email'
//	}, function (error) {
//		if (error) {
//			console.log(error);
//			return;
//		}
//
//		console.log('mail was sent');
//
//	});
});
