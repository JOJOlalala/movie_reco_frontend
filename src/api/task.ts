import axios from 'axios'

import store from '@/store'
import { ICallbackFn, QS } from './global'
import Exception from './exceptions'

export function getCurrentTasks() {
	return axios({
		method: 'GET',
		url: `/task/get_current_task/`,
		headers: { Authorization: localStorage.getItem('token') }
	})
}

export async function uploadVideo(
	params: FormData,
	successFn: ICallbackFn,
	errorFn: ICallbackFn = Exception.handle
) {
	try {
		const res = await axios({
			method: 'POST',
			url: `/task/upload_video/`,
			headers: { Authorization: localStorage.getItem('token') },
			data: params
		})
		successFn(res)
	} catch (err) {
		errorFn(err)
	}
}

export async function deleteVideo(
	id: number,
	successFn: ICallbackFn,
	errorFn: ICallbackFn = Exception.handle
) {
	try {
		const res = await axios({
			method: 'DELETE',
			url: `/task/${id}/delete_video/`,
			headers: { Authorization: localStorage.getItem('token') }
		})
		successFn(res)
	} catch (err) {
		errorFn(err)
	}
}
