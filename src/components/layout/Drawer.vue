<template>
	<v-navigation-drawer app v-model="display" color="grey lighten-5">
		<v-list-item two-line>
			<v-list-item-content>
				<v-avatar size="70">
					<img :src="this.$store.state.currentUser.profile.avatar" alt="Your Avatar" />
				</v-avatar>
				<v-list-item-title class="text-h5 text-center mt-1">
					{{ this.$store.state.currentUser.userName }}
				</v-list-item-title>
			</v-list-item-content>
		</v-list-item>

		<v-divider></v-divider>

		<v-list nav dense>
			<v-list-item
				v-for="item in drawer"
				:key="item.title"
				:to="item.to"
				:href="item.href"
				:target="item.target"
				exact
			>
				<v-list-item-icon>
					<v-icon>{{ item.icon }}</v-icon>
				</v-list-item-icon>

				<v-list-item-content>
					<v-list-item-title>{{ item.title }}</v-list-item-title>
				</v-list-item-content>
			</v-list-item>
			<v-list-item exact to="/login" @click="handleLogout" class="listItem">
				<v-list-item-icon>
					<v-icon color="yellow darken-3">mdi-logout-variant</v-icon>
				</v-list-item-icon>

				<v-list-item-content class="color:red">
					<v-list-item-title>退出登录</v-list-item-title>
				</v-list-item-content>
			</v-list-item>
		</v-list>
	</v-navigation-drawer>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import store from '@/store'

@Component({
	props: {
		drawerDisplay: Boolean
	}
})
export default class Drawer extends Vue {
	display = false
	drawer = [
		{ title: '使用手册', icon: 'mdi-text-box-search', to: '/adminPanel/documentation' },
		{
			title: '任务管理',
			icon: 'mdi-widgets',
			to: '/adminPanel/taskAdmin'
		},
		{
			title: '仪表盘',
			icon: 'mdi-home',
			to: '/adminPanel/dashBoard'
		},
		{
			title: '个人信息',
			icon: 'mdi-face-profile',
			to: '/adminPanel/userProfile'
		}
	]

	handleLogout() {
		this.$store.commit('resetUser')
	}

	@Watch('drawerDisplay')
	toggleDisplay(oldVal: string, newVal: string) {
		if (oldVal != newVal) {
			this.display = !this.display
		}
	}
}
</script>

<style scoped>
.listItem {
	background: #ffebee;
}
.listItem:hover {
	background: #ffcdd2;
}
.listItem:active {
	background: #ef9a9a;
}
</style>
