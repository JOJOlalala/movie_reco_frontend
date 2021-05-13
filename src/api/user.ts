import axios from 'axios'

import { ICallbackFn, QS } from './global'
import store from '@/store'
import global from './global'
import Exception from './exceptions'

export interface FormUserLogin {
	email?: string
	username: string
	password: string
	remember: 'yes' | 'no'
}

// the original buaa.top using cookie set by backend
// so you can directly enter using getProgile method
// however this time I use token to verify user
// so you will get a token payload, don't forget to
// add that token to your headers in next request of
// get your user profile
export async function loginWithAccount(
	user: FormUserLogin,
	successFn: ICallbackFn,
	errorFn: ICallbackFn = Exception.handle,
	finalFn: ICallbackFn = () => null
) {
	try {
		const res = await axios({
			method: 'POST',
			url: `/user/login/`,
			data: QS(user)
		})
		successFn(res)
	} catch (err) {
		errorFn(err)
	} finally {
		finalFn()
	}
}

export async function register(
	user: FormData,
	successFn: ICallbackFn,
	errorFn: ICallbackFn = Exception.handle,
	finalFn: ICallbackFn = () => null
) {
	try {
		const res = await axios({
			method: 'POST',
			url: `/user/register/`,
			data: user
		})
		successFn(res)
	} catch (err) {
		errorFn(err)
	} finally {
		finalFn()
	}
}

// wrap the request and handle it in updateUserProfileInStore function
// This is a traditionally shit mountain, never touch it once it get work
export function getProfile() {
	return axios({
		method: 'GET',
		url: `user/get_current_user/`,
		headers: { Authorization: localStorage.getItem('token') }
	})
}

export async function updateUserProfileInStore(): Promise<any> {
	return new Promise<void>((resolve, reject) => {
		getProfile()
			.then(res => {
				const payload = res.data.data
				const u = {
					username: payload.userData.username,
					profile: (() => {
						if (payload.userProfileData) {
							const i = payload.userProfileData
							return {
								bio: i.bio,
								avatar: global.imgUrl + i.avatar
							}
						} else return null
					})()
				}
				store.commit('updateUser', u)
				localStorage.setItem('isLogged', 'true')
				resolve()
			})
			.catch(err => {
				reject(err)
			})
	})
}

export async function updateUserProfile(
	data: FormData,
	successFn: ICallbackFn,
	errorFn: ICallbackFn = Exception.handle
) {
	try {
		const res = await axios({
			method: 'POST',
			url: `user/update_user/`,
			headers: {
				Authorization: localStorage.getItem('token')
			},
			data: data
		})
		successFn(res)
	} catch (err) {
		errorFn(err)
	}
}
