//  Created by Vian Chen on 1/29/19.
//  Copyright 2019 Vian Chen. All rights reserved.

import store from '@/store'

type Color = 'info' | 'warning' | 'error' | 'success'

function displaySnackbarWith(content: string, color: Color) {
	store.commit('updateSnackbar', { content, color })
}

const Snackbar = {
	emitsError: (content: string) => {
		displaySnackbarWith(content, 'error')
	},
	emitsWarning: (content: string) => {
		displaySnackbarWith(content, 'warning')
	},
	emitsSuccess: (content: string) => {
		displaySnackbarWith(content, 'success')
	},
	emitsInfo: (content: string) => {
		displaySnackbarWith(content, 'info')
	},
	collapse: () => {
		store.commit('updateSnackbar')
	}
}

export default Snackbar
