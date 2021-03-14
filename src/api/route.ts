import store from '@/store'
import global from './global'

function route(
	title: string,
	options?: {
		hideNaviTitle?: boolean
	}
) {
	if (!options)
		options = {
			hideNaviTitle: false
		}
	store.commit('setNaviTitle', options.hideNaviTitle ? '' : title)
	document.title = `${title} | ${global.siteName}`
}

export default route
