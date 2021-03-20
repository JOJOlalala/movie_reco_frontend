import dayjs from 'dayjs'
import qs from 'qs'

const global = {
	siteName: `电影人物提取分析平台 ${process.env.VUE_APP_BETA_STATUS}`,
	formatDate: (str: string) => dayjs(str).format('YYYY 年 M 月 D 日 H:mm'),
	parseDataSize: (num: number) => {
		if (num !== 0 && !num) return '无限制'
		let accumulator = 1024
		if (num < accumulator) return `${num} B`
		if (num < (accumulator *= 1024)) return `${(num / accumulator) * 1024} KB`
		if (num < (accumulator *= 1024)) return `${(num / accumulator) * 1024} MB`
		if (num < (accumulator *= 1024)) return `${(num / accumulator) * 1024} GB`
		return `> 1 TB`
	},
	avatarBaseUrl: 'http://127.0.0.1:8000'
}

export default global

export type ICallbackFn = (...params: any) => any

export const QS = qs.stringify
