/* jshint -W030 */

import sinon from 'sinon';

import * as otp from 'parts/auth/lib/helpers/totp/otp';
import totpConfigured from 'parts/auth/lib/helpers/totp/totpConfigured';
import loggedInTotp from 'parts/auth/lib/helpers/totp/loggedInTotp';

describe('Auth Part', () => {
	describe('Helpers', () => {
		describe('TOTP', () => {
			var notConfiguredUser = {
					totp: {
						enabled: false,
						key: null,
						period: null
					}
				},
				configuredUser = {
					totp: {
						enabled: true,
						key: 'randomKey',
						period: otp.TOTP_PERIOD
					}
				},
				configuredDisabledUser = {
					totp: {
						enabled: false,
						key: 'randomKey',
						period: otp.TOTP_PERIOD
					}
				};

			describe('otp Helper', () => {
				var key;

				beforeEach(() => {
					key = otp.generateKey(otp.TOTP_RANDOM_BYTES);
				});

				it('should generate a valid key', () => {
					key.should.have.length(otp.TOTP_RANDOM_BYTES * 2);
				});

				it('should generate a valid code', () => {
					var code = otp.generateCode(key, otp.TOTP_PERIOD);

					otp.verify(code, key, otp.TOTP_PERIOD).should.not.be.a('null');
				});
			});

			describe('totpConfigured Helper', () => {
				var res, next,
					path = '/';

				beforeEach(function () {
					res = {
						redirect: sinon.spy()
					};

					next = sinon.spy();
				});

				it('should return a function', () => {
					totpConfigured(path).should.be.a('function');
				});

				it('should call redirect when totp is not configured', () => {
					var middleware = totpConfigured(path);

					var req = {
						user: notConfiguredUser
					};

					middleware(req, res, next);

					res.redirect.should.have.been.calledWith(path);

					next.should.not.have.been.called;
				});

				it('should call next when totp is configured', () => {
					var middleware = totpConfigured(path);

					var req = {
						user: configuredUser
					};

					middleware(req, res, next);

					res.redirect.should.not.have.been.called;

					next.should.have.been.called;
				});

			});

			describe('loggedInTotp Helper', () => {
				var array, res, next,
					authPath = '/auth',
					totpPath = '/totp';

				beforeEach(() => {
					array = loggedInTotp(authPath, totpPath);

					res = {
						redirect: sinon.spy()
					};

					next = sinon.spy();
				});

				it('should return an array with exactly 2 functions', () => {
					array.should.be.an('array');
					array.should.have.length(2);

					array[0].should.be.a('function');
					array[1].should.be.a('function');
				});

				it('should call redirect for totp-enabled user when session.totp is false', () => {
					var req = {
						user: configuredUser,
						originalUrl: authPath,
						session: {
							totp: false
						}
					};

					array[1](req, res, next);

					next.should.not.have.been.called;

					res.redirect.should.have.been.calledWith(totpPath);

					req.session.should.contain.key('returnTo');
				});

				it('should call next for totp-enabled user when session.totp is true', () => {
					var req = {
						user: configuredUser,
						originalUrl: authPath,
						session: {
							totp: true
						}
					};

					array[1](req, res, next);

					next.should.have.been.called;

					res.redirect.should.not.have.been.called;

					req.session.should.not.contain.key('returnTo');
				});

				it('should call next for totp-disabled user when session.totp is irrelevant', () => {
					var req = {
						user: configuredDisabledUser,
						originalUrl: authPath,
						session: {
							totp: false
						}
					};

					array[1](req, res, next);

					next.should.have.been.called;

					res.redirect.should.not.have.been.called;

					req.session.should.not.contain.key('returnTo');
				});
			});
		});
	});
});