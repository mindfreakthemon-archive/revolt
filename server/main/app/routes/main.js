import express from 'express';

import inherit from 'core/helpers/express/inherit';
import render from 'core/helpers/utils/render';

export default function () {
	var router = express();

	router.on('mount', inherit);

	router.get('/', render('main/index'));

	router.get('/error', function () {
		throw Error('sad');
	});

	return router;
}