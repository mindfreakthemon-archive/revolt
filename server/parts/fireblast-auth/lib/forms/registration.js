import Form from 'parts/forms/lib/forms/form';
import User from 'fireblast-auth/lib/models/user';

import unique from 'parts/forms/lib/forms/validators/unique';

export default class extends Form {
	get fields() {
		return {
			username: Form.fields.string({
				required: true,
				validators: [
					unique(User, 'local.username')
				]
			}),
			password: Form.fields.password({
				required: Form.validators.required()
			}),
			confirm: Form.fields.password({
				required: true,
				validators: [
					Form.validators.matchField('password')
				]
			}),
			email: Form.fields.email({
				validators: [
					unique(User, 'email')
				]
			})
		};
	}
}
