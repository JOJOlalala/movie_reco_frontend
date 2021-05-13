import axios from 'axios'

import store from '@/store'
import { ICallbackFn, QS } from './global'
import Exception from './exceptions'

export async function getCurrentTasks(
	successFn: ICallbackFn,
	errorFn: ICallbackFn = Exception.handle,
	finalFn: ICallbackFn = () => null
) {
	try {
		const res = await axios({
			method: 'GET',
			url: `/task/get_current_task/`,
			headers: { Authorization: localStorage.getItem('token') }
		})
		successFn(res)
	} catch (err) {
		errorFn(err)
	} finally {
		finalFn()
	}
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

export async function extractActors(
	id: number,
	params: FormData,
	successFn: ICallbackFn,
	errorFn: ICallbackFn = Exception.handle
) {
	try {
		const res = await axios({
			method: 'POST',
			url: `/task/${id}/extract_actors/`,
			headers: { Authorization: localStorage.getItem('token') },
			data: params
		})
		successFn(res)
	} catch (err) {
		errorFn(err)
	}
}

// method = 0是只进行文件路径的索引，不会向华为发送请求查找演员数据
// index如果存在就请求某个id的具体数据，没有就是请求所有key_frame文件夹下的图片
export async function getActorIndexs(
	id: number,
	params: {
		method: number
		index?: number
	},
	successFn: ICallbackFn,
	errorFn: ICallbackFn = Exception.handle
) {
	try {
		const res = await axios({
			method: 'GET',
			url: `/task/${id}/get_task_actors/`,
			headers: { Authorization: localStorage.getItem('token') },
			params
		})
		successFn(res)
	} catch (err) {
		errorFn(err)
	}
}

export async function shuffleKeyFrame(
	id: number,
	params: {
		imgPath: string
	},
	successFn: ICallbackFn,
	errorFn: ICallbackFn = Exception.handle,
	finalFn: ICallbackFn
) {
	try {
		const res = await axios({
			method: 'GET',
			url: `/task/${id}/key_frame_shuffle/`,
			headers: { Authorization: localStorage.getItem('token') },
			params
		})
		successFn(res)
	} catch (err) {
		errorFn(err)
	} finally {
		finalFn()
	}
}

export async function crawl(
	id: number,
	successFn: ICallbackFn,
	errorFn: ICallbackFn = Exception.handle,
	finalFn: ICallbackFn
) {
	try {
		const res = await axios({
			method: 'GET',
			url: `/task/${id}/crawl/`,
			headers: { Authorization: localStorage.getItem('token') }
		})
		successFn(res)
	} catch (err) {
		errorFn(err)
	} finally {
		finalFn()
	}
}

export async function getActors(
	id: number,
	successFn: ICallbackFn,
	errorFn: ICallbackFn = Exception.handle,
	finalFn: ICallbackFn
) {
	try {
		const res = await axios({
			method: 'GET',
			url: `/task/${id}/get_actors/`,
			headers: { Authorization: localStorage.getItem('token') }
		})
		successFn(res)
	} catch (err) {
		errorFn(err)
	} finally {
		finalFn()
	}
}

/**
 * not used, but keeped
 */
export async function getMovies(
	id: number,
	successFn: ICallbackFn,
	errorFn: ICallbackFn = Exception.handle,
	finalFn: ICallbackFn,
	params: {
		actor: string
	}
) {
	try {
		const res = await axios({
			method: 'GET',
			url: `/task/${id}/get_movies/`,
			headers: { Authorization: localStorage.getItem('token') },
			params
		})
		successFn(res)
	} catch (err) {
		errorFn(err)
	} finally {
		finalFn()
	}
}

export async function getIntersections(
	id: number,
	successFn: ICallbackFn,
	errorFn: ICallbackFn = Exception.handle,
	finalFn: ICallbackFn
) {
	try {
		const res = await axios({
			method: 'GET',
			url: `/task/${id}/get_intersections/`,
			headers: { Authorization: localStorage.getItem('token') }
		})
		successFn(res)
	} catch (err) {
		errorFn(err)
	} finally {
		finalFn()
	}
}
