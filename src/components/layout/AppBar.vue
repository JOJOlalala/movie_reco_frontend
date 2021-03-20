<template>
	<v-app-bar app flat color="white">
		<v-toolbar-items class="d-flex align-center">
			<v-app-bar-nav-icon @click.stop="$emit('toggleDrawer')"></v-app-bar-nav-icon>
			<v-text-field
				hide-details
				flat
				dense
				outlined
				solo
				label="Search"
				prepend-inner-icon="mdi-magnify"
			/>
		</v-toolbar-items>

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

		<v-btn text>
			<div class="d-flex align-center">
				<v-avatar size="32">
					<img
						src="https://cdn.pixabay.com/photo/2020/11/08/10/25/dog-5723334_1280.jpg"
						alt="avatar"
					/>
				</v-avatar>

				<div class="ml-1 subtitle-2">
					{{ $store.state.currentUser.username }}
				</div>
			</div>
		</v-btn>
	</v-app-bar>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class AppBar extends Vue {
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
