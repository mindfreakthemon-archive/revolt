import csrf from 'csurf';


export default function () {
	var app = this;

	app.use(csrf());

	app.logger.debug('initialized csrf');
}