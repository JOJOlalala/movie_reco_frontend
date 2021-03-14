<template>
	<div>
		<Drawer />

		<AppBar />

		<v-main>
			<router-view />

			<v-footer>
				{{ new Date().getFullYear() }}
				<span class="ml-2">
					<strong
						><a href="https://heroui.net" target="_blank" rel="noopener noreferrer"
							>HeroUI</a
						></strong
					>
				</span>
			</v-footer>
		</v-main>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import AppBar from '@/components/layout/AppBar.vue'
import Drawer from '@/components/layout/Drawer.vue'

@Component({
	components: {
		AppBar,
		Drawer
	}
})
export default class AdminPanel extends Vue {}
</script>

<style lang="stylus"></style>
