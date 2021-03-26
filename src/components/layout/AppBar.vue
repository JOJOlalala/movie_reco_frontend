<template>
	<v-app-bar
		app
		fixed
		color="#6A76AB"
		dark
		dense
		:collapse="!collapseOnScroll"
		:collapse-on-scroll="collapseOnScroll"
	>
		<v-app-bar-nav-icon @click.stop="$emit('toggleDrawer')"></v-app-bar-nav-icon>
		<v-app-bar-title>管理</v-app-bar-title>

		<v-spacer />

		<v-btn icon>
			<v-icon>
				mdi-bell-outline
			</v-icon>
		</v-btn>

		<v-btn icon>
			<v-icon>
				mdi-apps-box
			</v-icon>
		</v-btn>

		<v-btn icon>
			<v-icon>mdi-dots-vertical</v-icon>
		</v-btn>
		<!-- <template v-slot:extension>
			<v-tabs align-with-title>
				<v-tab>Tab 1</v-tab>
				<v-tab>Tab 2</v-tab>
				<v-tab>Tab 3</v-tab>
			</v-tabs>
		</template> -->
	</v-app-bar>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class AppBar extends Vue {
	collapseOnScroll = true
	drawer = [
		{ title: 'Back to front', icon: 'mdi-arrow-left', to: '/' },
		{
			title: 'Free Download',
			icon: 'mdi-download',
			href: 'https://github.com/AGDholo/shock',
			target: '_black'
		},
		{
			title: 'Dashboard',
			icon: 'mdi-home',
			to: '/dashboard/pages/dashboards/dashboard'
		},
		{
			title: 'Profile',
			icon: 'mdi-face-profile',
			to: '/dashboard/pages/examples/profile'
		},
		{
			title: 'Sign-in',
			icon: 'mdi-login',
			to: '/dashboard/pages/examples/sign-in'
		}
	]
}
</script>

<style></style>
