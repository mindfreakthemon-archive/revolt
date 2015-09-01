import Form from 'parts/auth/lib/forms/login';

import bootstrap from 'parts/forms/lib/forms/renderers/bootstrap.placeholders';

export default class extends Form {
	constructor(request, response) {
		super(request, response);

		this.renderer = bootstrap;
	}
}
