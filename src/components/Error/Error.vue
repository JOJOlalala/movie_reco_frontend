<!--
    Created by Vian Chen on 9/30/18.
    Copyright 2018 Vian Chen. All rights reserved.
-->

<template>
	<VD>
		<div id="card-container">
			<v-card
				id="fullPageNotification"
				class="vertical-horizontal-center-align vian-card elevation-20"
			>
				<div id="vian-card--left">
					<v-img height="100%" :src="getImgUrl(errorContent.image)" />
				</div>
				<div id="vian-card--right">
					<p class="vian-card--right-title">
						{{ errorContent.title }}
					</p>
					<p class="vian-card--right-content">
						{{ errorContent.content }}
					</p>
					<p class="grey--text vian-card--right-content">问题位置：{{ currentURL }}</p>
				</div>
			</v-card>
		</div>
	</VD>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import VD from './VD.vue'
import VDContent from './VDContent.vue'
import { route, Snackbar } from '@/api'

interface TypeError {
	title: string
	content: string
	image: string
}

const presetContents: {
	[key: string]: TypeError
} = {
	'000': {
		title: '正在更新的内容',
		content: '我们为你准备了更多精彩的内容。请过一会儿再来查看。',
		image: '000'
	},

	'001': {
		title: '应用程序已崩溃',
		content:
			'很抱歉，在我们处理你请求的过程中，某个环节发生了未知问题，导致了应用程序崩溃。请将此情况反馈给我们，以帮助我们完善此应用程序。',
		image: '500'
	},

	'403': {
		title: '被拒绝的请求',
		content: '你的请求已被我们的服务器拒绝。你可能没有权限访问此内容。',
		image: '403'
	},

	'404': {
		title: '不存在的页面',
		content:
			'很抱歉，你请求的页面在我们的服务器上找不到。可能你输入了错误的 URL，或者相关内容已被删除。',
		image: '404'
	},

	'500': {
		title: '服务器错误',
		content: `很抱歉，我们的服务器出现了异常。请向我们报告这一问题。`,
		image: '500'
	}
}

@Component({
	props: {
		errorCode: String
	},

	components: {
		VD,
		VDContent
	}
})
export default class Error extends Vue {
	get errorContent(): TypeError {
		const mapped = presetContents[this.$props.errorCode]
		return mapped ? mapped : presetContents['404']
	}

	activated() {
		route('请求的内容不可用', { hideNaviTitle: true })
	}

	get currentURL() {
		return document.URL
	}

	mounted() {
		route('请求的内容不可用', { hideNaviTitle: true })
	}

	/**
	 * Dynamically load local image assets.
	 * @param code Image reference code. For example, "000" (developing), "404" (not found) and "500" (denied).
	 */
	getImgUrl(code: string) {
		const images = require.context('@/assets/images', false, /\.png$/)
		return images('./' + code + '.png')
	}
}
</script>

<style lang="stylus">
/**
 * Enables the notification container to occupy the entire page.
 */
#card-container {
    width: 100%;
    height: 820px;
}

.vertical-horizontal-center-align {
    margin: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    @media (max-width: 1000px) {
        top: 64px;
        left: 0;
        transform: none;
    }
}

#fullPageNotification {
    width: 70%;
    height: 500px;
    @media (max-width: 1000px) {
        width: 100%;
        height: 450px;
        box-shadow: none !important;
    }
}

.vian-card {
    /**
     * The !important tag solves a bug introduced by vue-router.
     */
    border-radius: 15px 15px 15px 15px !important;
    overflow: hidden !important;
    display: flex !important;
    flex-direction: row !important;
    @media (max-width: 1000px) {
        border-radius: 7px 7px 0 0 !important;
    }
}

#vian-card--left {
    width: 30%;
    height: 100%;
    margin: 0 0 0 0;
    padding: 0 0 0 0;
    overflow: hidden;
    border-top-right-radius: 0px;
    @media (max-width: 1000px) {
        display: none;
    }
}

#vian-card--left img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
}

#vian-card--right {
    position: relative;
    width: 70%;
    height: 100%;
    margin: 0 0 0 0;
    @media (max-width: 1000px) {
        width: 100%;
    }
}

.vian-card--right-title {
    font-size: 48px;
    font-weight: 700;
    margin-bottom: 30px;
    padding: 40px 10px 0px 50px;
    @media (max-width: 1000px) {
        font-size: 32px;
    }
}

.vian-card--right-content {
    font-size: 20px;
    font-weight: normal;
    margin-bottom: 20px;
    padding: 0px 50px 10px 50px;
}
</style>
