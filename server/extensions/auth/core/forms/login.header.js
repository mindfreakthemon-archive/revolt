import Form from 'core/forms/login'

import bootstrap from 'core/forms/renderers/bootstrap.placeholders';

export default class extends Form {
	constructor(request, response) {
		super(request, response);

		this.renderer = bootstrap;
	}
}