import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import VueApexCharts from 'vue-apexcharts'
import axios from 'axios'

Vue.config.productionTip = false
Vue.use(VueApexCharts)
Vue.component('apexchart', VueApexCharts)
axios.defaults.baseURL = '/api'

new Vue({
	router,
	store,
	vuetify,
	render: h => h(App)
}).$mount('#app')
