<template>
	<v-navigation-drawer app expand-on-hover v-model="drawerDisplay">
		<v-list-item two-line>
			<v-list-item-content>
				<v-list-item-title class="text-h5 font-weight-black">
					{{ this.$store.state.currentUser.userName }}
				</v-list-item-title>
			</v-list-item-content>
		</v-list-item>

		<v-divider></v-divider>

		<v-list nav>
			<v-list-item
				v-for="item in drawer"
				:key="item.title"
				:to="item.to"
				:href="item.href"
				:target="item.target"
				exact
				color="primary"
			>
				<v-list-item-icon>
					<v-icon>{{ item.icon }}</v-icon>
				</v-list-item-icon>

				<v-list-item-content>
					<v-list-item-title>{{ item.title }}</v-list-item-title>
				</v-list-item-content>
			</v-list-item>
		</v-list>
	</v-navigation-drawer>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Drawer extends Vue {
	drawerDisplay = true
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
			to: '/adminPanel/dashboard'
		},
		{
			title: 'Profile',
			icon: 'mdi-face-profile',
			to: '/'
		},
		{
			title: 'Sign-in',
			icon: 'mdi-login',
			to: '/'
		}
	]
}
</script>

<style></style>
