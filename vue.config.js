// const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')
// const ImageminPlugin = require('imagemin-webpack-plugin').default
// const ImageminMozjpeg = require('imagemin-mozjpeg')

const port = 8080 // dev port

module.exports = {
	transpileDependencies: ['vuetify'],
	productionSourceMap: false,
	// configureWebpack: {
	// 	plugins: (() => {
	// 		let plugins = [new VuetifyLoaderPlugin()]
	// 		if (process.env.NODE_ENV === 'production') {
	// 			plugins.push(
	// 				new ImageminPlugin({
	// 					pngquant: {
	// 						quality: '70'
	// 					},
	// 					jpgquant: [
	// 						ImageminMozjpeg({
	// 							quality: '70'
	// 						})
	// 					]
	// 				})
	// 			)
	// 		}
	// 		return plugins
	// 	})(),
	// 	devtool: 'source-map'
	// },
	devServer: {
		port,
		proxy: {
			'/api': {
				target: process.env.VUE_APP_URL,
				changeOrigin: true,
				pathRewrite: {
					'^/api': '/api'
				}
			}
		}
	}
}
