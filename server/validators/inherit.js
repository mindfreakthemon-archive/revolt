import forms from 'forms';
import util from 'util';

module.exports = function (app) {
	util._extend(app.validators, forms.validators);
};