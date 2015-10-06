import render from 'fireblast-core/lib/helpers/utils/render';

export const MOUNT_PATH = '/admin';

export default function (router) {
	router
		.get('/', render('admin/index'))
}

