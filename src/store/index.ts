import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		isNaviDisplayed: true,
		currentTitle: '',
		currentUser: {
			userName: '',
			email: '',
			userID: '0',
			info: null
		}
	},
	mutations: {
		setNaviTitle(state, title?: string) {
			if (title === undefined) title = 'Loading'
			state.currentTitle = title
		}
	},
	actions: {},
	modules: {}
})
