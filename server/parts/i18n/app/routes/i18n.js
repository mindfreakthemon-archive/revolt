import LocaleForm from 'parts/i18n/lib/forms/locale';

export const MOUNT_PATH = '/i18n';

export default function (router) {
	router
		.post('/select', function (req, res) {
			var form = new LocaleForm(req, res);

			form.handle({
				success: function (form) {
					res.sendLocaleCookie(form.data.locale);
				}
			});

			res.redirect('/');
		});
}