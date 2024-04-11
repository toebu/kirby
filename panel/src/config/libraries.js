import { library } from "kirby";

export default {
	install(app) {
		app.prototype.$library = library;
	}
};
