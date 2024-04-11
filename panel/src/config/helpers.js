export default {
	install(app) {
		app.prototype.$helper = {
			...kirby.helpers,
			clone: kirby.helpers.object.clone,
			pad: kirby.helpers.string.pad,
			slug: kirby.helpers.string.slug,
			uuid: kirby.helpers.string.uuid
		};

		app.prototype.$esc = kirby.helpers.string.escapeHTML;
	}
};
