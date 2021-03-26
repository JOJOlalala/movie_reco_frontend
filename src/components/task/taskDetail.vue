<template>
	<v-card>
		<v-list three-line subheader>
			<v-subheader>当前任务：{{ this.task.taskName }}</v-subheader>
			<v-list-item>
				<v-list-item-content>
					<v-select
						:items="selectItems"
						filled
						label="视频格式"
						v-model="currentSelect"
						@change="toggleVideoForm"
						:disabled="!task.isProcessed"
					></v-select>
					<v-spacer />
					<videoPlayer
						class="video-player vjs-custom-skin"
						ref="videoPlayer"
						:playsinline="true"
						:options="playerOptions"
					></videoPlayer></v-list-item-content
			></v-list-item>
		</v-list>
		<v-divider></v-divider>
		<v-list three-line subheader>
			<v-subheader>人物提取</v-subheader>
			<v-list-item>
				<v-list-item-action> </v-list-item-action>
			</v-list-item>
		</v-list>
		<v-divider></v-divider>
		<v-list three-line subheader>
			<v-subheader>识别演员</v-subheader>
			<v-list-item>
				<v-list-item-action>
					<v-checkbox v-model="notifications"></v-checkbox>
				</v-list-item-action>
				<v-list-item-content>
					<v-card class="mt-4 mx-auto" max-width="300">
						<v-sheet
							class="v-sheet--offset mx-auto"
							color="cyan"
							elevation="12"
							max-width="calc(100% - 32px)"
						>
							<v-img src="https://picsum.photos/510/300?random" aspect-ratio="1.7" contain></v-img>
						</v-sheet>

						<v-card-text class="pt-0">
							<div class="title font-weight-light mb-2">
								User Registrations
							</div>
							<div class="subheading font-weight-light grey--text">
								Last Campaign Performance
							</div>
							<v-divider class="my-2"></v-divider>
							<v-icon class="mr-2" small>
								mdi-clock
							</v-icon>
							<span class="caption grey--text font-weight-light"
								>last registration 26 minutes ago</span
							>
						</v-card-text>
					</v-card>
				</v-list-item-content>
			</v-list-item>
		</v-list>
	</v-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { videoPlayer } from 'vue-video-player'
import 'video.js/dist/video-js.css'

@Component({
	props: {
		task: {}
	},
	components: {
		videoPlayer
	}
})
export default class TaskDetail extends Vue {
	notifications = false
	sound = true
	widgets = false
	currentSelect = '原生视频'
	selectItems = ['原生视频', '处理视频']
	playerOptions = {
		// videojs options
		playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
		autoplay: false, //如果true,浏览器准备好时开始回放。
		muted: false, // 默认情况下将会消除任何音频。
		loop: false, // 导致视频一结束就重新开始。
		preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
		language: 'zh-CN',
		// fluid: false, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
		sources: [
			{
				type: 'video/mp4',
				src: '' // 路径
			}
		],
		poster: '../../static/images/test.jpg', //你的封面地址
		// width: document.documentElement.clientWidth,
		notSupportedMessage: '此视频暂无法播放，请稍后再试' //允许覆盖Video.js无法播放媒体源时显示的默认信息。
		// controlBar: {
		// 	timeDivider: true,
		// 	durationDisplay: true,
		// 	remainingTimeDisplay: false,
		// 	fullscreenToggle: true //全屏按钮
		// }
	}
	created() {
		this.taskDetailInitialize()
	}
	taskDetailInitialize() {
		this.playerOptions.sources[0].src = 'http://localhost:8000' + this.$props.task.originalVideo
	}
	toggleVideoForm() {
		if (this.currentSelect == '原生视频') {
			this.playerOptions.sources[0].src = 'http://localhost:8000' + this.$props.task.originalVideo
		} else {
			const dirPath = this.$props.task.originalVideo
			let arr = dirPath.split('/')
			arr = arr.splice(0, arr.length - 1).join('/')
			this.playerOptions.sources[0].src =
				'http://localhost:8000' + arr + '/processed_video/output.mp4'
		}
	}
}
</script>

<style>
.v-sheet--offset {
	top: -24px;
	position: relative;
}
</style>
