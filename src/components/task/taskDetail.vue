<template>
	<div>
		<v-dialog v-model="loadingDialog" persistent width="400">
			<v-card color="primary" dark>
				<v-card-text>
					正在完成操作… 这需要一点时间。
					<v-progress-linear indeterminate color="white" class="mb-0" />
				</v-card-text>
			</v-card>
		</v-dialog>
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
			<v-list three-line subheader v-if="task.isProcessed">
				<v-subheader>人物提取</v-subheader>
				<v-list-item>
					<v-list-item-action>
						<v-dialog v-model="extractDialog" width="500px">
							<template v-slot:activator="{ on, attrs }">
								<v-btn color="red lighten-2" dark v-bind="attrs" v-on="on">
									提取人物
								</v-btn>
							</template>

							<v-card>
								<v-card-title class="headline grey lighten-2">
									选择提取参数
								</v-card-title>

								<v-card-text>
									<v-text-field
										outlined
										v-model="process_config.maximumNum"
										label="最大处理人脸帧数"
										hide-details
										clearable
										class="mt-4"
									></v-text-field>
									<v-text-field
										outlined
										v-model="process_config.maximumFramePerIndex"
										label="单次索引最大帧"
										hide-details
										clearable
										class="mt-4"
									></v-text-field>
									<v-text-field
										outlined
										v-model="process_config.maximumIndex"
										label="最大索引数"
										hide-details
										clearable
										class="mt-4"
									></v-text-field>
								</v-card-text>

								<v-divider></v-divider>

								<v-card-actions>
									<v-spacer></v-spacer>
									<v-btn color="primary" text @click="extractDialog = false">
										取消
									</v-btn>
									<v-btn color="primary" text @click="extractActors">
										确认
									</v-btn>
								</v-card-actions>
							</v-card>
						</v-dialog>
					</v-list-item-action>
				</v-list-item>
				<v-list-item>
					<v-list-item-content>
						<v-dialog v-model="indexDialog" width="1000px">
							<v-card>
								<v-card-title class="headline grey lighten-2">
									选取关键帧
								</v-card-title>

								<v-card-text>
									<v-row class="pt-4">
										<v-col
											cols="12"
											xl="2"
											lg="2"
											md="3"
											sm="4"
											xs="4"
											v-for="(val, i) in actorDetail"
											:key="i"
										>
											<v-hover v-slot="{ hover }">
												<v-sheet
													:elevation="hover ? 20 : 4"
													:class="{
														'on-hover': hover,
														detail: true
													}"
													class="rounded-lg"
												>
													<a>
														<v-img
															:src="concatUrl(val)"
															@click="shuffleKeyFrame(actorDetail[i])"
															class="rounded-lg"
														></v-img> </a></v-sheet
											></v-hover>
										</v-col>
									</v-row>
								</v-card-text>
							</v-card>
						</v-dialog>
						<v-row>
							<v-col
								cols="12"
								xl="2"
								lg="2"
								md="3"
								sm="4"
								xs="4"
								v-for="(val, i) in actorImgUrls"
								:key="i"
							>
								<v-card class="mt-4 mx-auto" color="blue lighten-4">
									<v-hover v-slot="{ hover }">
										<v-sheet
											:elevation="hover ? 14 : 2"
											:class="{
												'on-hover': hover,
												'mx-auto': true,
												task: true
											}"
											max-width="calc(100% - 32px)"
											class="rounded-lg"
										>
											<a>
												<v-img
													:src="val"
													aspect-ratio="1"
													class="rounded-lg"
													@click="openIndexDialog(i + 1)"
												>
													<template v-slot:placeholder>
														<v-row class="fill-height ma-0" align="center" justify="center">
															<v-progress-circular
																indeterminate
																color="grey lighten-5"
															></v-progress-circular>
														</v-row>
													</template>
												</v-img>
											</a>
										</v-sheet>
									</v-hover>

									<v-card-text class="pt-0 mt-0">
										<div class="title font-weight-light black--text">id_{{ i + 1 }}</div>
										<v-divider class="py-1"></v-divider>
										<div class="subheading font-weight-light">
											截取次数：
										</div>
									</v-card-text>
								</v-card>
							</v-col>
						</v-row>
					</v-list-item-content>
				</v-list-item>
			</v-list>
			<v-divider></v-divider>
			<v-list three-line subheader v-if="actors">
				<v-subheader>识别演员</v-subheader>
				<v-list-item>
					<v-list-item-action>
						<v-btn color="red lighten-2" dark @click="searchActors(2)">
							搜索人物
						</v-btn>
					</v-list-item-action>
				</v-list-item>
				<v-list-item>
					<v-list-item-content>
						<v-dialog v-model="indexDialog" width="1000px">
							<v-card>
								<v-card-title class="headline grey lighten-2">
									选取关键帧
								</v-card-title>

								<v-card-text>
									<v-row class="pt-4">
										<v-col
											cols="12"
											xl="2"
											lg="2"
											md="4"
											sm="6"
											v-for="(val, i) in actorDetail"
											:key="i"
										>
											<v-hover v-slot="{ hover }">
												<v-sheet
													:elevation="hover ? 20 : 4"
													:class="{
														'on-hover': hover,
														detail: true
													}"
													class="rounded-lg"
												>
													<v-img
														:src="concatUrl(val)"
														@click="shuffleKeyFrame(actorDetail[i])"
														class="rounded-lg"
													></v-img></v-sheet
											></v-hover>
										</v-col>
									</v-row>
								</v-card-text>
							</v-card>
						</v-dialog>
						<v-row>
							<v-col
								cols="12"
								xl="2"
								lg="2"
								md="3"
								sm="4"
								xs="4"
								v-for="(val, i) in actors"
								:key="i"
							>
								<v-card class="mt-4 mx-auto" color="blue lighten-4">
									<v-hover v-slot="{ hover }" disabled="true">
										<v-sheet
											:elevation="2"
											:class="{
												'on-hover': hover,
												'mx-auto': true,
												task: true
											}"
											max-width="calc(100% - 32px)"
											class="rounded-lg"
										>
											<v-img :src="actorImgUrls[i]" aspect-ratio="1" class="rounded-lg">
												<template v-slot:placeholder>
													<v-row class="fill-height ma-0" align="center" justify="center">
														<v-progress-circular
															indeterminate
															color="grey lighten-5"
														></v-progress-circular>
													</v-row>
												</template>
											</v-img>
										</v-sheet>
									</v-hover>

									<v-card-text class="pt-0 mt-0">
										<div class="title font-weight-light black--text">
											{{ actors[i].result.length === 0 ? '未识别' : actors[i].result[0].label }}
										</div>
										<v-divider class="py-1"></v-divider>
										<div class="subheading font-weight-light">
											{{
												actors[i].result.length === 0
													? '无信息'
													: '可信度：' + Number(actors[i].result[0].confidence).toFixed(4)
											}}
										</div>
									</v-card-text>
								</v-card>
							</v-col>
						</v-row>
					</v-list-item-content>
				</v-list-item>
			</v-list>
			<v-divider></v-divider>
			<v-list three-line subheader v-if="actorList">
				<v-subheader>出现的演员</v-subheader>
				<v-list-item>
					<v-list-item-action>
						<v-btn color="red lighten-2" dark @click="crawl">
							演员信息爬取
						</v-btn>
					</v-list-item-action>
				</v-list-item>
				<v-list-item>
					<v-list-item-content>
						<v-row>
							<v-col
								cols="12"
								xl="2"
								lg="2"
								md="3"
								sm="4"
								xs="4"
								v-for="(val, i) in actorList"
								:key="i"
							>
								<v-card class="mt-4 mx-auto" color="blue lighten-4">
									<v-hover v-slot="{ hover }">
										<v-sheet
											:elevation="hover ? 14 : 2"
											:class="{
												'on-hover': hover,
												'mx-auto': true,
												task: true
											}"
											style="line-height:0;"
											max-width="calc(100% - 32px)"
											class="rounded-lg"
										>
											<a>
												<img
													:src="actorList[i]['img']"
													referrerPolicy="no-referrer"
													class="rounded-lg actorAvatar"
													@click="openUrl(actorList[i]['url'])"
												/>
											</a>
										</v-sheet>
									</v-hover>
									<v-card-text class="pt-0 mt-0">
										<v-divider class="py-1"></v-divider>
										<div class="title font-weight-light black--text">
											{{ actorList[i]['name'] }}
										</div>
									</v-card-text>
								</v-card>
							</v-col>
						</v-row>
					</v-list-item-content>
				</v-list-item>
			</v-list>
			<v-list three-line subheader v-if="intersections">
				<v-subheader>电影交集</v-subheader>
				<v-list-item>
					<v-data-table
						:headers="headers"
						:items="intersections"
						sort-by="date"
						class="elevation-4 pa-5"
						style="width:100%;"
					>
						<template v-slot:top>
							<v-toolbar flat>
								<v-toolbar-title>备选电影列表</v-toolbar-title>
								<v-divider class="mx-4" inset vertical></v-divider>
								<v-spacer></v-spacer>
							</v-toolbar>
						</template>
						<template v-slot:item.link="{ item }">
							<a :target="item['link']" @click="openUrl(item['link'])">{{ item['link'] }}</a>
						</template>
						<template v-slot:no-data>
							<div>
								没有合适的备选电影
							</div>
						</template>
					</v-data-table>
				</v-list-item>
			</v-list>
		</v-card>
	</div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { videoPlayer } from 'vue-video-player'
import 'video.js/dist/video-js.css'
import { Snackbar, Task, exceptions } from '@/api'
import LoadingAlert from '@/components/layout/LoadingAlert.vue'
import { global } from '@/api'

@Component({
	props: {
		task: {}
	},
	components: {
		videoPlayer,
		LoadingAlert
	}
})
export default class TaskDetail extends Vue {
	loadingDialog = false
	currentSelect = '原生视频'
	selectItems = ['原生视频', '处理视频']
	process_config = {
		maximumNum: '1000',
		maximumFramePerIndex: '10',
		maximumIndex: '10'
	}
	actorImgUrls = []
	actorDetail = []
	actors = []
	actorList = []
	intersections = []
	extractDialog = false
	indexDialog = false
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
		notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
		controlBar: {
			timeDivider: true,
			durationDisplay: true,
			remainingTimeDisplay: true,
			fullscreenToggle: true //全屏按钮
		}
	}
	headers = [
		{
			text: '名称',
			align: 'start',
			sortable: false,
			value: 'title'
		},
		{ text: '上映时间', value: 'date' },
		{ text: '链接', value: 'link' }
	]
	created() {
		this.taskDetailInitialize()
	}
	taskDetailInitialize() {
		this.currentSelect = '原生视频'
		this.playerOptions.sources[0].src = global.imgUrl + this.$props.task.originalVideo
		this.actorImgUrls = []
		this.actorDetail = []
		this.actors = []
		this.actorList = []
		if (this.$props.task.isProcessed) {
			this.getActorIndex()
			this.searchActors(1)
			this.getActors()
			this.getIntersections()
		}
	}

	getActorIndex() {
		this.loadingDialog = true
		Task.getActorIndexs(this.$props.task.id, { method: 0 }, res => {
			if (res.data && res.data.data && res.data.data.imgList) {
				this.actorImgUrls = res.data.data.imgList
				this.actorImgUrls.forEach((element, index, array: any) => {
					array[index] = global.imgUrl + '/' + element
				})
			}
			this.loadingDialog = false
		})
	}

	searchActors(method: number) {
		this.loadingDialog = true
		Task.getActorIndexs(this.$props.task.id, { method }, res => {
			if (res.data && res.data.data && res.data.data.imgList) {
				this.actors = res.data.data.imgList
			}
			this.loadingDialog = false
		})
	}
	extractActors() {
		this.loadingDialog = true
		const startTime = Date.now()
		const formData = new FormData()
		formData.append('maximumNum', this.process_config.maximumNum)
		formData.append('maximumFramePerIndex', this.process_config.maximumFramePerIndex)
		formData.append('maximumIndex', this.process_config.maximumIndex)
		Task.extractActors(this.$props.task.id, formData, res => {
			const endTime = Date.now()
			Snackbar.emitsSuccess('成功提取演员，用时：' + (endTime - startTime) / 1000 + '秒')
			this.$props.task.isProcessed = true
			this.loadingDialog = false
			this.extractDialog = false
			this.taskDetailInitialize()
		})
	}
	toggleVideoForm() {
		if (this.currentSelect == '原生视频') {
			this.playerOptions.sources[0].src = global.imgUrl + this.$props.task.originalVideo
		} else {
			const dirPath = this.$props.task.originalVideo
			let arr = dirPath.split('/')
			arr = arr.splice(0, arr.length - 1).join('/')
			this.playerOptions.sources[0].src = global.imgUrl + arr + '/processed_video/output.mp4'
		}
	}
	openIndexDialog(index: number) {
		this.loadingDialog = true
		Task.getActorIndexs(this.$props.task.id, { method: 0, index: index }, res => {
			if (res.data && res.data.data && res.data.data.imgList) {
				this.actorDetail = res.data.data.imgList
				// this.actorDetail.forEach((element, index, array: any) => {
				// 	array[index] = global.imgUrl + '/' + element
				// })
			}
			this.loadingDialog = false
			this.indexDialog = true
		})
	}
	shuffleKeyFrame(img: string) {
		this.loadingDialog = true
		Task.shuffleKeyFrame(
			this.$props.task.id,
			{ imgPath: img },
			res => {
				this.getActorIndex()
				this.loadingDialog = false
				this.indexDialog = false
			},
			err => exceptions.handle(err),
			() => {
				this.loadingDialog = false
			}
		)
	}

	crawl() {
		this.loadingDialog = true
		const startTime = Date.now()
		Task.crawl(
			this.$props.task.id,
			res => {
				const endTime = Date.now()
				Snackbar.emitsSuccess('信息爬取完成，用时：' + (endTime - startTime) / 1000 + '秒')
				this.loadingDialog = false
				this.getActors()
			},
			err => exceptions.handle(err),
			() => {
				this.loadingDialog = false
			}
		)
	}

	getActors() {
		this.loadingDialog = true
		Task.getActors(
			this.$props.task.id,
			res => {
				this.actorList = res.data.data
				this.getIntersections()
				this.loadingDialog = false
			},
			err => exceptions.handle(err),
			() => {
				this.loadingDialog = false
			}
		)
	}

	getIntersections() {
		this.loadingDialog = true
		Task.getIntersections(
			this.$props.task.id,
			res => {
				this.intersections = res.data.data
				this.loadingDialog = false
			},
			err => exceptions.handle(err),
			() => {
				this.loadingDialog = false
			}
		)
	}

	openUrl(url: string) {
		window.open(url)
	}

	concatUrl(val: string) {
		return global.imgUrl + '/' + val
	}
	@Watch('task')
	onTaskUpdate() {
		this.taskDetailInitialize()
	}
}
</script>

<style scoped>
.v-sheet.task {
	top: -24px;
	position: relative;
}
.v-sheet.task:not(.on-hover) {
	top: -12px;
	position: relative;
}

.v-sheet.detail {
	top: -24px;
	position: relative;
}
.v-sheet.detail:not(.on-hover) {
	top: -12px;
	position: relative;
}
img.actorAvatar {
	width: 100%;
	height: auto;
	background-size: cover;
	object-fit: cover;
}
</style>
