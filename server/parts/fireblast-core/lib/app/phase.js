import { Promise } from 'bluebird';

let initializers = [];

export function phase(phase) {
	initializers.push(phase);
}

export function boot() {
	return Promise.each(initializers, phase => phase());
}
