import Form from 'fireblast-auth/lib/forms/login';

import bootstrap from 'fireblast-forms/lib/forms/renderers/bootstrap.placeholders';

export default class extends Form {
	constructor(request, response) {
		super(request, response);

		this.renderer = bootstrap;
	}
}
