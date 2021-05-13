//  Created by Vian Chen on 1/23/19.
//  Copyright 2019 Vian Chen. All rights reserved.

import store from '@/store'
import Snackbar from '@/api/snackbar'

function redirectTo(code: '403' | '404' | '500') {
	return () => {
		store.commit('updateErrorCode', code)
	}
}

function reportPossibleBugs() {
	Snackbar.emitsError('在处理您请求的过程中发生了错误。')
}

const exceptionHandlers: any = {
	1: redirectTo('500'),
	100: () => {
		Snackbar.emitsError(
			'您已经登录，因此不需要重复登录。一般情况下，您不应当看到这个提示。如果您非主动请求其 API，请向我们报告这一问题。'
		)
	},
	200: redirectTo('403'),
	500: redirectTo('404'),
	'0101': () => {
		Snackbar.emitsError('没有找到相应的用户。')
	},
	'0105': () => {
		Snackbar.emitsError('该用户名已经被注册了。')
	},
	'0204': () => {
		Snackbar.emitsError('Are you OK?')
	}
	// 501: (err: any) => {
	// 	let reasons = ''
	// 	const errors = err.response.data.data.errors
	// 	if (errors.tag) for (const el of errors.tag) reasons += `${el}. `
	// 	if (errors.group_id) for (const el of errors.group_id) reasons += `${el}. `
	// 	if (!reasons) reasons = '未知。'
	// 	Snackbar.emitsError(`无法响应您创建课程的要求。原因：${reasons}`)
	// }
}

export default {
	handle: (err: any) => {
		if (
			err.response.data &&
			err.response.data.error &&
			err.response.data.error.code &&
			exceptionHandlers[err.response.data.error.code]
		)
			exceptionHandlers[err.response.data.error.code](err)
		else {
			console.error('Uncaught:', err)
			reportPossibleBugs()
		}
		store.commit('displayProgress', false)
	},
	rejectUnauthorizedOperation: redirectTo('403'),
	throwWith: (code: '000' | '001') => {
		store.commit('updateErrorCode', code)
	}
}
