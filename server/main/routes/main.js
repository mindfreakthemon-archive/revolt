import render from 'parts/core/lib/helpers/utils/render';

export const MOUNT_PATH = '/';

export default function (router) {
	router.get('/', render('main/index'));

	router.get('/error', function () {
		throw Error('sad');
	});
}