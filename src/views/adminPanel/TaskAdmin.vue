<template>
	<div class="pa-4">
		<v-sheet color="transparent">
			<v-row>
				<div class="text-h5 font-weight-medium pt-3 px-5">
					任务管理
				</div>
			</v-row>
			<v-row>
				<v-col cols="12"> <TaskTable></TaskTable> </v-col>
			</v-row>
		</v-sheet>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import TaskTable from '@/components/task/taskTable.vue'

@Component({
	components: {
		TaskTable
	}
})
export default class TaskAdmin extends Vue {}
</script>

<style scoped>
/* 
	for study and debug, you can turn this on
 */
/* .container {
	border: 1px solid green;
}
.row {
	border: 1px solid red;
}
.col {
	border: 1px solid blue;
} */
</style>
