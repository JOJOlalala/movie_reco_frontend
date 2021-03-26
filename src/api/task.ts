import axios from 'axios'

import { QS } from './global'
import store from '@/store'
import global from './global'

export function getCurrentTasks() {
	return axios({
		method: 'GET',
		url: `/task/get_current_task/`,
		headers: { Authorization: localStorage.getItem('token') }
	})
}
