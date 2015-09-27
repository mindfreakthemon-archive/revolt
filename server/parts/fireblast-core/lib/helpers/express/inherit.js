export default function (app) {
	this.locals.basedir = app.locals.basedir;
	this.conf = app.conf;

	this.set('views', app.get('views'));
	this.set('view engine', app.get('view engine'));
	this.set('view cache', app.get('view cache'));
	this.set('case sensitive routing', app.get('case sensitive routing'));
	this.set('x-powered-by', app.get('x-powered-by'));
}
