import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import ErrorPage from '@/views/404.vue'
import AdminPanel from '@/views/adminPanel/AdminPanel.vue'
import DashBoard from '@/views/adminPanel/DashBoard.vue'
import TaskAdmin from '@/views/adminPanel/TaskAdmin.vue'
import Documentation from '@/views/adminPanel/Documentation.vue'
import UserProfile from '@/views/adminPanel/UserProfile.vue'
import store from '@/store'
import * as UserAPI from '@/api/user'
import { Snackbar } from '@/api'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
	{
		path: '/',
		name: 'home',
		component: Home
	},
	{
		path: '/about',
		name: 'about',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
		meta: {
			noAuthRequire: true
		}
	},
	{
		path: '/login',
		name: 'login',
		component: Login,
		meta: {
			noAuthRequire: true
		}
	},
	{
		path: '/adminPanel',
		component: AdminPanel,
		children: [
			{
				path: '',
				redirect: { name: 'dashBoard' }
			},
			{
				path: 'dashBoard',
				name: 'dashBoard',
				component: DashBoard
			},
			{
				path: 'taskAdmin',
				name: 'taskAdmin',
				component: TaskAdmin
			},
			{
				path: 'documentation',
				name: 'documentation',
				component: Documentation
			},
			{
				path: 'userProfile',
				name: 'userProfile',
				component: UserProfile
			}
		]
	},
	{
		path: '*',
		name: 'errorPage',
		component: ErrorPage,
		meta: {
			noAuthRequire: true
		}
		// redirect: '/error/404'
	}
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

router.beforeEach((to, from, next) => {
	// login重定向管道
	if (to.meta && to.meta.noAuthRequire && to.meta.noAuthRequire === true) {
		// 不需要认证
		store.commit('displayProgress', true)
		next()
	} else {
		// 需要认证
		const loggedIn = localStorage.getItem('isLogged') === 'true'
		if (loggedIn) {
			// 存在验证，检查token是否过期并同步用户信息
			store.commit('displayProgress', true)
			// TODO 不应该直接使用update，也许该使用token验证方法
			UserAPI.updateUserProfileInStore()
				.then(next)
				.catch(err => {
					if (err.response && err.response.status && err.response.status === 401) {
						localStorage.setItem('isLogged', '')
						next({ name: 'login' })
					} else {
						Snackbar.emitsWarning('身份验证已过期，请重新登陆')
						// next({ name: 'login', query: { redirect: ‘/ } })
					}
				})
		} else {
			// 未认证
			Snackbar.emitsWarning('您必须先登录，才能访问此页面内容。')
			next({ name: 'login', query: { redirect: to.path } })
		}
	}
})

export default router
