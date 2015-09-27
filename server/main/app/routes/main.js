import render from 'fireblast-core/lib/helpers/utils/render';

export const MOUNT_PATH = '/';

export default function (router) {
	router.get('/', render('main/index'));

	router.get('/flash', function (req, res) {
		req.flash('danger', 'nice');
		res.redirect('/');
	});

	router.get('/flash2', function (req, res) {
		req.flash('danger', 'nice');
		req.flash('danger', '2');
		req.flash('info', 'nice');
		res.redirect('/');
	});

	router.get('/error', function () {
		throw Error('sad');
	});
}