<template>
	<div>
		<k-button
			:disabled="isLocked"
			:dropdown="true"
			:title="$t('settings')"
			icon="cog"
			variant="filled"
			size="sm"
			class="k-view-options"
			@click="$refs.settings.toggle()"
		/>
		<k-dropdown-content
			ref="settings"
			:options="$dropdown(id)"
			align-x="end"
			@action="action"
		/>
	</div>
</template>

<script>
export default {
	inheritAttrs: false,
	props: {
		id: String,
		isLocked: Boolean,
		model: Object
	},
	methods: {
		action(action) {
			if (this.model.filename) {
				switch (action) {
					case "replace":
						return this.$panel.upload.replace({
							...this.preview,
							...this.model
						});
				}
			}
		}
	}
};
</script>
