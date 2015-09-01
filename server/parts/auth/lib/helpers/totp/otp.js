import url from 'url';
import crypto from 'crypto';
import base32 from 'thirty-two';
import { totp } from 'notp';

export const TOTP_RANDOM_BYTES = 5;
export const TOTP_PERIOD = 30;

export function generateKey(randomBytes) {
	var key;

	try {
		key = crypto.randomBytes(randomBytes).toString('hex');
	} catch (e) {
		key = crypto.pseudoRandomBytes(randomBytes).toString('hex');
	}

	return key;
}

export function generateCode(key, period) {
	return totp.gen(key, {
		time: period
	});
}

export function encodeKey(key) {
	return base32.encode(key).toString();
}

export function formatUrl(encodedKey, period, data) {
	return url.format({
		protocol: 'otpauth',
		slashes: true,
		hostname: 'totp',
		pathname: data,
		query: {
			secret: encodedKey,
			period: period
		}
	});
}

export function verify(code, key, period) {
	return totp.verify(code, key, {
		time: period
	});
}