import Languages from "./LanguagesButton.vue";
import Preview from "./PreviewButton.vue";
import Settings from "./SettingsButton.vue";
import Status from "./StatusButton.vue";
import Theme from "./ThemeButton.vue";

import ViewButtons from "./ViewButtons.vue";

export default {
	install(app) {
		app.component("k-languages-button", Languages);
		app.component("k-preview-button", Preview);
		app.component("k-settings-button", Settings);
		app.component("k-status-button", Status);
		app.component("k-theme-button", Theme);

		app.component("k-view-buttons", ViewButtons);

		// @deprecated
		app.component("k-languages-dropdown", Languages);
	}
};
