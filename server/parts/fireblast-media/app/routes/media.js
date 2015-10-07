import paginate from 'express-paginate';

import render from 'fireblast-core/lib/helpers/utils/render';
import allowed from 'fireblast-acl/lib/helpers/acl/allowed';

import MediaItem from 'fireblast-media/lib/models/media.item';
import MediaAddItemForm from 'fireblast-media/lib/forms/add.item';

export const MOUNT_PATH = '/media';

export default function (router) {
	router
		.get('/',

			paginate.middleware(),
			allowed('media:items', 'list'),

			(req, res, next) => {
				var page = req.query.page || 1,
					limit = req.query.limit || 2;

				MediaItem
					.paginate({}, {
						page,
						limit,
						sortBy: {
							created: -1
						}
					})
					.spread((items, pageCount, itemCount) => {
						res.render('media/items', {
							page, limit, items, pageCount, itemCount
						});
					})
					.catch(next);
			})

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

					item.save(() => {
						res.redirect(router.mountpath);
					});

				},
				other: function () {
					res.render('media/create', {
						form
					});
				}
			});
		})

		//.all('/:id/update', allowed('media:item', 'update'))
		//
		//.get('/:id/update', (req, res, next) => {
		//
		//})
		//.post('/:id/update', (req, res, next) => {
		//
		//})


		.get('/:id/delete', allowed('media:item', 'delete'), (req, res, next) => {
			MediaItem.findByIdAndRemove(req.params.id)
				.exec()
				.then(() => {
					res.redirect(router.mountpath);
				})
				.catch(next);
		})

		.get('/:id', allowed('media:item', 'read'), (req, res, next) => {
			MediaItem.findById(req.params.id)
				.exec()
				.then((item) => {
					if (!item) {
						next();
						return;
					}

					res.render('media/item', {
						item: item
					});
				})
				.catch(next);
		});

}

