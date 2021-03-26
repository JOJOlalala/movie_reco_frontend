<template>
	<div>
		<v-img
			class="fill-height"
			src="https://cdn.pixabay.com/photo/2015/06/08/15/11/typewriter-801921_1280.jpg"
			:aspect-ratio="16 / 9"
			height="100vh"
			width="100vw"
			gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)"
		>
			<v-container fill-height fluid>
				<v-row justify="center" align="center" class="fill-height">
					<v-col cols="12" sm="8" md="8" lg="6" xl="4">
						<v-progress-linear
							:indeterminate="true"
							v-show="loading"
							id="loginPanelProgressBar"
							color="success"
						/>
						<v-card elevation="12" class="py-8">
							<v-card-title>
								<v-row justify="center">
									<h2 class="text-h4 black--text font-weight-bold">
										请先登陆
									</h2>
								</v-row>
							</v-card-title>
							<v-card-text class="text-center">
								<div class="mt-6">
									<v-row justify="center">
										<v-col cols="12" md="10">
											<v-text-field
												label="输入用户名"
												outlined
												prepend-inner-icon="mdi-account-outline"
												hide-details
												required
												v-model="username"
											></v-text-field>

											<v-text-field
												label="密码"
												outlined
												prepend-inner-icon="mdi-lock-open"
												hide-details
												required
												class="mt-6"
												type="password"
												v-model="password"
											></v-text-field>

											<div class="d-flex align-center justify-space-between mt-4">
												<v-checkbox label="记住我的账号"></v-checkbox>

												<div class="primary--text text-subtitle-1">
													忘记密码？
												</div>
											</div>

											<div class="mt-4">
												<v-btn
													block
													class="text-capitalize"
													large
													color="primary"
													@click="loginHandler"
													>登陆</v-btn
												>
											</div>

											<div class="mt-6">
												<div class="mt-6">
													还没有注册？
													<span class="primary--text text-subtitle-1">注册账号</span>
												</div>
											</div>
										</v-col>
									</v-row>
								</div>
							</v-card-text>
						</v-card>
					</v-col>
				</v-row>
			</v-container>
		</v-img>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import Router from '@/router'
import store from '@/store'
import { route, User, Snackbar } from '@/api'

@Component
export default class Login extends Vue {
	key = null
	username = ''
	password = ''
	remember = false
	loading = false

	extractUserInfo(): null | User.FormUserLogin {
		if (!this.password || this.password.length < 6) return null
		const userFormData: User.FormUserLogin = {
			username: this.username,
			password: this.password,
			remember: this.remember ? 'yes' : 'no'
		}
		return userFormData
	}

	reportFailedLogin(error: any) {
		if (error === null) Snackbar.emitsWarning('你输入的学号 / E-Mail / 密码格式不正确。')
		else if (error.response === null) Snackbar.emitsError('连接服务器失败。检查你的网络连接。')
		else if (error.response === undefined) {
			if (!navigator.onLine) Snackbar.emitsError('你必须有可用的网络连接才能继续。')
			else Snackbar.emitsError('很抱歉，因为某种原因，我们无法处理你的请求。请向我们报告这一问题。')
		} else {
			// Exception.handle(error)
			Snackbar.emitsError('服务器错误，可能是服务器尚未启动。')
		}
	}

	async handleSuccessfulLogin(response: any) {
		Snackbar.emitsSuccess('欢迎回来。')
		try {
			await User.updateUserProfileInStore()
			this.$router.push('/adminPanel')
			// store.commit('updateNotifCenter')
		} catch (err) {
			// Exception.handle(err)
			Snackbar.emitsError('用户身份验证已失效，请重新登陆。')
		}
	}

	async loginHandler() {
		const user = this.extractUserInfo()
		if (user === null) {
			this.reportFailedLogin(null)
			return
		}
		this.loading = true
		try {
			const res: any = await User.loginAs(user)
			const payload = res.data
			localStorage.setItem('token', 'JWT ' + payload.data.token)
			this.handleSuccessfulLogin(res)
		} catch (err) {
			this.reportFailedLogin(err)
		} finally {
			this.loading = false
		}
	}

	activated() {
		// if the user is already logged in
		if (localStorage.getItem('logged') === 'true') Router.push('/')
		// route('登录', { hideNaviTitle: true })
	}
}
</script>

<style lang="stylus"></style>
