import loggedIn from 'fireblast-auth/lib/helpers/auth/loggedIn';
import render from 'fireblast-core/lib/helpers/utils/render';

export const MOUNT_PATH = '/user';

export default function (router) {
	router
		.all('*', loggedIn('/auth/login'))

		.get('/self', render('user/self'));
}
