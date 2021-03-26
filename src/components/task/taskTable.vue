<template>
	<div>
		<v-dialog v-model="detailDialog" fullscreen hide-overlay transition="dialog-bottom-transition">
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
			class="elevation-1"
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
					<v-dialog v-model="dialogDelete" max-width="500px">
						<v-card>
							<v-card-title class="headline">确定要删除该任务吗?</v-card-title>
							<v-card-actions>
								<v-spacer></v-spacer>
								<v-btn color="blue darken-1" text @click="closeDelete">取消</v-btn>
								<v-btn color="blue darken-1" text @click="deleteItemConfirm">确定</v-btn>
								<v-spacer></v-spacer>
							</v-card-actions>
						</v-card>
					</v-dialog>
				</v-toolbar>
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
				<v-btn color="primary" @click="initialize">
					Reset
				</v-btn>
			</template>
		</v-data-table>
	</div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { Task } from '@/api'
import TaskDetail from '@/components/task/taskDetail.vue'

@Component({
	components: {
		TaskDetail
	}
})
export default class TaskAdmin extends Vue {
	detailDialog = false
	search = ''
	dialogDelete = false
	headers = [
		{
			text: '名称',
			align: 'start',
			sortable: false,
			value: 'taskName'
		},
		{ text: '创建时间', value: 'createTime' },
		{ text: '操作', value: 'actions', sortable: false }
	]
	tasks: { taskName: string; createTime: string; originalVideo: string }[] = []
	editedIndex = -1
	editedItem = {
		taskName: ''
	}
	defaultItem = {
		taskName: ''
	}

	get formTitle() {
		return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
	}

	created() {
		this.initialize()
	}

	async initialize() {
		// send get_current_task requset
		const res: any = await Task.getCurrentTasks()
		this.tasks = res.data.data.userTasks
	}

	editItem(item: any) {
		this.editedIndex = this.tasks.indexOf(item)
		this.editedItem = Object.assign({}, item)
		this.detailDialog = true
	}

	deleteItem(item: any) {
		this.editedIndex = this.tasks.indexOf(item)
		this.editedItem = Object.assign({}, item)
		this.dialogDelete = true
	}

	deleteItemConfirm() {
		this.tasks.splice(this.editedIndex, 1)
		this.closeDelete()
	}

	closeDelete() {
		this.dialogDelete = false
		this.$nextTick(() => {
			this.editedItem = Object.assign({}, this.defaultItem)
			this.editedIndex = -1
		})
	}

	@Watch('dialogDelete')
	onDialogDelete(newVal: string) {
		newVal || this.closeDelete()
	}
}
</script>
