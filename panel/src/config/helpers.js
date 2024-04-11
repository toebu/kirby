import { helpers } from "kirby";

export default {
	install(app) {
		app.prototype.$helpers = app.prototype.$helper = {
			...helpers,
			clone: helpers.object.clone,
			pad: helpers.string.pad,
			slug: helpers.string.slug,
			uuid: helpers.string.uuid
		};

		app.prototype.$esc = helpers.string.escapeHTML;
	}
};
