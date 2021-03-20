<template>
	<div id="app">
		<v-app>
			<Error v-if="$store.state.errorCode" :errorCode="$store.state.errorCode" />
			<div v-else>
				<keep-alive>
					<router-view />
				</keep-alive>
			</div>
			<v-snackbar
				v-model="snackbarDisplay"
				:color="snackbarColor"
				bottom
				vertical
				:timeout="9000"
				id="appSnackbar"
			>
				{{ snackbarContent }}
				<v-btn color="white" text @click.stop="collapseSnackbar" style="font-weight: 800;">
					好
				</v-btn>
			</v-snackbar>
		</v-app>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Snackbar from './api/snackbar'
import Error from '@/components/Error/Error.vue'
import store from '@/store'

@Component({
	components: {
		Error
	}
})
export default class App extends Vue {
	/**
	 * Relays action to the snackbar API. Will and should only be called by the template system.
	 */
	collapseSnackbar() {
		Snackbar.collapse()
	}

	get snackbarDisplay() {
		return store.state.snackbar.display
	}

	/**
	 * The setter that will only be called by the Vuetify system. You **shouldn't** be calling this method
	 * because it can be confusing in the context. Use `this.collapseSnackbar` instead.
	 */
	set snackbarDisplay(display: boolean) {
		// This checking is here to prevent the developer from calling this method by accident (for
		// example, in the template system); The `false` constraint in the parameter list on the other
		// hand is to enable type checking by TypeScript so that developers cannot call this method
		// in their code.
		Snackbar.collapse()
	}

	get snackbarColor() {
		return this.$store.state.snackbar.color
	}

	get snackbarContent() {
		return this.$store.state.snackbar.content
	}
}
</script>

<style lang="stylus">
#appSnackbar {
    z-index: 1001;
}
</style>
