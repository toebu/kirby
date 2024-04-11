/**
 * The Search mixin is intended for all components
 * that feature a query input that should trigger
 * running a search via a required `search` method.
 */
export default {
	props: {
		delay: {
			default: 200,
			type: Number
		},
		hasSearch: {
			default: true,
			type: Boolean
		}
	},
	data() {
		return {
			query: null
		};
	},
	watch: {
		query() {
			if (this.hasSearch !== false) {
				this.search();
			}
		}
	},
	created() {
		this.search = this.$helpers.debounce(this.search, this.delay);
	},
	methods: {
		async search() {
			console.warn("Search mixin: Please implement a `search` method.");
		}
	}
};
