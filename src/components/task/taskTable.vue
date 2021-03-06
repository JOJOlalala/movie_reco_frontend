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
		<v-dialog
			v-model="detailDialog"
			fullscreen
			hide-overlay
			transition="dialog-bottom-transition"
			persistent
		>
			<v-toolbar dark color="primary" dense fixed>
				<v-btn icon dark @click="detailDialog = false">
					<v-icon>mdi-keyboard-return</v-icon>
				</v-btn>
				<v-toolbar-title></v-toolbar-title>
			</v-toolbar>
			<TaskDetail :task="this.editedItem"></TaskDetail>
		</v-dialog>
		<v-data-table
			:search="search"
			:headers="headers"
			:items="tasks"
			sort-by="createTime"
			class="elevation-1 pa-4"
			:loading="tableLoading"
			loading-text="正在加载中... 请稍后"
		>
			<template v-slot:top>
				<v-toolbar flat>
					<v-toolbar-title>任务列表</v-toolbar-title>
					<v-divider class="mx-4" inset vertical></v-divider>
					<v-text-field
						dense
						outlined
						v-model="search"
						label="搜索"
						class="align-self-center"
						hide-details
						clearable
						append-icon="mdi-magnify"
					></v-text-field>
					<v-spacer></v-spacer>
					<v-dialog v-model="taskCreateDialog" max-width="500px">
						<template v-slot:activator="{ on, attrs }">
							<v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
								创建任务
							</v-btn>
						</template>
						<v-card>
							<v-card-title>
								<span class="headline">{{ formTitle }}</span>
							</v-card-title>

							<v-card-text>
								<v-container>
									<v-row>
										<v-text-field
											v-model="editedItem.taskName"
											label="任务名称"
											counter
											maxlength="20"
											:rules="[rules.required, rules.taskNameCounter]"
											clearable
										></v-text-field>
									</v-row>
									<v-row>
										<v-file-input
											:rules="[rules.taskFileRule, rules.required]"
											accept="video/mp4"
											placeholder="选择视频文件"
											label="上传视频（接受MP4格式）"
											show-size
											hide-details
											v-model="taskFile"
											clearable
										></v-file-input>
									</v-row>
								</v-container>
							</v-card-text>

							<v-card-actions>
								<v-spacer></v-spacer>
								<v-btn color="blue darken-1" text @click="cancelTaskCreate">
									取消
								</v-btn>
								<v-btn color="blue darken-1" text @click="confirmTaskCreate">
									确认
								</v-btn>
							</v-card-actions>
						</v-card>
					</v-dialog>
					<v-dialog v-model="taskDeleteDialog" max-width="500px">
						<v-card>
							<v-card-title class="headline">确定要删除该任务吗?</v-card-title>
							<v-card-actions>
								<v-spacer></v-spacer>
								<v-btn color="blue darken-1" text @click="cancelTaskDelete">取消</v-btn>
								<v-btn color="blue darken-1" text @click="confirmTaskDelete">确定</v-btn>
								<v-spacer></v-spacer>
							</v-card-actions>
						</v-card>
					</v-dialog>
				</v-toolbar>
			</template>
			<template v-slot:item.isProcessed="{ item }">
				{{ item.isProcessed ? '是' : '否' }}
			</template>
			<template v-slot:item.actions="{ item }">
				<v-icon small class="mr-2" @click="editItem(item)">
					mdi-eye-outline
				</v-icon>
				<v-icon small @click="deleteItem(item)">
					mdi-delete
				</v-icon>
			</template>
			<template v-slot:no-data>
				<div>
					您当前没有创建任务
				</div>
			</template>
		</v-data-table>
	</div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { Snackbar, Task } from '@/api'
import TaskDetail from '@/components/task/taskDetail.vue'

@Component({
	components: {
		TaskDetail
	}
})
export default class TaskAdmin extends Vue {
	detailDialog = false
	search = ''
	taskDeleteDialog = false
	taskCreateDialog = false
	tableLoading = true
	loadingDialog = false
	headers = [
		{
			text: '名称',
			align: 'start',
			sortable: false,
			value: 'taskName'
		},
		{ text: '创建时间', value: 'createTime' },
		{ text: '是否处理', value: 'isProcessed' },
		{ text: '操作', value: 'actions', sortable: false }
	]
	tasks: {
		taskName: string
		createTime: string
		originalVideo: string
		id: number
		isProcessed: boolean
	}[] = []
	taskFile: any = null
	editedIndex = -1
	editedItem = {
		taskName: ''
	}
	defaultItem = {
		taskName: ''
	}
	rules = {
		taskFileRule: (value: File) =>
			!value || value.size < 50000000 || 'Avatar size should be less than 50 MB!',
		taskNameCounter: (value: string) => {
			if (value && value.length) return value.length <= 20 || '最大20个字符'
			else return false || '任务名不能为空'
		},
		required: (value: any) => !!value || '任务名不能为空'
	}

	get formTitle() {
		return this.editedIndex === -1 ? '创建任务' : '修改任务'
	}

	created() {
		this.initialize()
	}

	initialize() {
		this.loadingDialog = true
		this.tableLoading = true
		// send get_current_task requset
		Task.getCurrentTasks(res => {
			if (res && res.data && res.data.data) {
				this.tasks = res.data.data.userTasks
			}
			for (const task of this.tasks) {
				const date = new Date(task.createTime)
				task.createTime = date.toLocaleDateString() + date.toLocaleTimeString()
			}
			this.tableLoading = false
			this.loadingDialog = false
		})
	}

	editItem(item: any) {
		this.editedIndex = this.tasks.indexOf(item)
		this.editedItem = Object.assign({}, item)
		this.detailDialog = true
	}

	deleteItem(item: any) {
		this.editedIndex = this.tasks.indexOf(item)
		this.editedItem = Object.assign({}, item)
		this.taskDeleteDialog = true
	}

	confirmTaskDelete() {
		this.loadingDialog = true
		Task.deleteVideo(this.tasks[this.editedIndex].id, res => {
			this.tasks.splice(this.editedIndex, 1)
			this.cancelTaskDelete()
			this.loadingDialog = false
		})
	}

	cancelTaskDelete() {
		this.taskDeleteDialog = false
		this.$nextTick(() => {
			this.editedItem = Object.assign({}, this.defaultItem)
			this.editedIndex = -1
		})
	}

	cancelTaskCreate() {
		// 取消任务创建对话框
		this.taskCreateDialog = false
	}

	confirmTaskCreate() {
		// 任务创建对话框确认上传
		const formData = new FormData()
		const file = this.taskFile
		if (this.rules.required(this.editedItem.taskName) === true) {
			if (this.rules.taskNameCounter(this.editedItem.taskName) === true) {
				if (this.rules.taskFileRule(file) === true) {
					null
				} else {
					Snackbar.emitsWarning('视频内容不能为空，并且不能超过50M。')
					return
				}
			} else {
				Snackbar.emitsWarning('任务名不能超过20个字符。')
				return
			}
		} else {
			Snackbar.emitsWarning('任务名不能为空。')
			return
		}
		this.loadingDialog = true
		formData.append('originalVideo', file)
		formData.append('taskName', this.editedItem.taskName)
		Task.uploadVideo(formData, res => {
			this.initialize()
			this.editedItem = {
				taskName: ''
			}
			this.taskFile = null
			this.taskCreateDialog = false
			this.loadingDialog = false
		})
	}
}
</script>
