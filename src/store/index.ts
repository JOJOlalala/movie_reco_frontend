import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		isNaviDisplayed: true,
		isNaviProgressDisplayed: false,
		currentTitle: '',
		isAuthenticated: false,
		currentUser: {
			userName: '',
			profile: {
				bio: '',
				avatar: ''
			}
		},
		snackbar: {
			display: false,
			content: '',
			color: 'info'
		}
	},
	mutations: {
		setNaviTitle(state, title?: string) {
			if (title === undefined) title = 'Loading'
			state.currentTitle = title
		},
		displayProgress(state, display: boolean) {
			state.isNaviProgressDisplayed = display
		},
		updateSnackbar(
			state,
			option?: {
				content: string
				color: 'warning' | 'success' | 'error' | 'info'
			}
		) {
			state.snackbar.display = false
			if (option != null) {
				if (option.content == undefined || option.color == undefined)
					throw new Error('Incorrect parameters in the option provided.')
				setTimeout(() => {
					state.snackbar.display = true
					state.snackbar.content = option.content!
					state.snackbar.color = option.color!
				}, 100)
			}
		},

		updateUser(
			state,
			user: {
				username: string
				profile?: any
			}
		) {
			state.currentUser.userName = user.username
			state.currentUser.profile = user.profile
		},
		resetUser(state) {
			localStorage.setItem('isLogged', 'false')
			localStorage.setItem('token', '')
			state.currentUser.userName = ''
			state.currentUser.profile = {
				bio: '',
				avatar: ''
			}
		}
	},
	actions: {},
	modules: {}
})
