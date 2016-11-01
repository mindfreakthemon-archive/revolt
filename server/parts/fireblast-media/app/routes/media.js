import paginate from 'express-paginate';

import render from 'fireblast-core/lib/helpers/utils/render';
import allowed from 'fireblast-acl/lib/helpers/acl/allowed';

import MediaAddItemForm from 'fireblast-media/lib/forms/add.item';

export const MOUNT_PATH = '/media';

export default function (app) {
	app
		.get('/',

			paginate.middleware(),
			allowed('media:items', 'list'),

			(req, res, next) => {
				var page = req.query.page || 1,
					limit = req.query.limit || 2;

				app.model.MediaItem
					.paginate({}, {
						page,
						limit,
						sortBy: {
							created: -1
						}
					})
					.then(({ docs, total, limit, page, pages }) => {
						res.render('media/items', {
							page, limit, items: docs, pageCount: pages, itemCount: total
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
					var item = new app.model.MediaItem();

					item.set({
						title: form.data.title,
						body: form.data.body
					});

					item.save(() => {
						res.redirect(app.mountpath);
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
			app.model.MediaItem.findByIdAndRemove(req.params.id)
				.exec()
				.then(() => {
					res.redirect(app.mountpath);
				})
				.catch(next);
		})

		.get('/:id', allowed('media:item', 'read'), (req, res, next) => {
			app.model.MediaItem.findById(req.params.id)
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

