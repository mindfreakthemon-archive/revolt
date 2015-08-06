/**
 * Renders template. Simple stuff
 * @param template
 * @returns {Function}
 */
export default function (template) {
	var args = Array.prototype.slice.call(arguments, 0);

	return function (req, res) {
		res.render.apply(res, args);
	};
};