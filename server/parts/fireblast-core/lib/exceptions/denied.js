import BaseException from 'fireblast-core/lib/exceptions/base';

export default class extends BaseException {
	get errorCode() {
		return 1;
	}

	get httpCode() {
		return 403;
	}

	constructor(resource, permission) {
		super();

		this.resource = resource;
		this.permission = permission;
	}

	get msg() {
		return 'fux';
	}
}