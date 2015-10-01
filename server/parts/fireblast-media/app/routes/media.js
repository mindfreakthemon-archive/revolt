import render from 'fireblast-core/lib/helpers/utils/render';
import allowed from 'fireblast-core/lib/helpers/acl/allowed';

import MediaItem from 'fireblast-media/lib/models/media.item';
import MediaAddItemForm from 'fireblast-media/lib/forms/add.item';

export const MOUNT_PATH = '/media';

export default function (router) {
	router
		.get('/', () => {})

		.all('/create', allowed('media:item', 'create'))
		.get('/create', render('media/create'))
		.post('/create', (req, res) => {
			var form = new MediaAddItemForm(req, res);

			form.handle({
				success: function (form) {
					var item = new MediaItem();

					item.set({
						title: form.data.title,
						body: form.data.body
					});

					res.redirect('/');
				},
				other: function () {
					res.render('media/create');
				}
			});
		})

		.post('/:id/update', allowed('media:item', 'update'), () => {})

		.post('/:id/delete', allowed('media:item', 'delete'), () => {})

		.get('/:id', allowed('media:item', 'read'), () => {});

}

