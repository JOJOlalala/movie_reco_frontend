<template>
	<div class="pa-4">
		<v-sheet color="transparent">
			<v-row>
				<div class="text-h5 font-weight-medium pt-3 px-5">
					任务管理
				</div>
			</v-row>
			<v-row>
				<v-col cols="12" lg="6" xl="6" class="pa-3">
					<v-card outlined>
						<v-carousel show-arrows-on-hover cycle height="350px">
							<v-carousel-item
								v-for="(item, i) in items"
								:key="i"
								:src="item.src"
							></v-carousel-item>
						</v-carousel>
					</v-card>
				</v-col>
				<v-col cols="12" lg="6" xl="6" class="pa-3">
					<v-row>
						<v-col class="pa-3">
							<v-card cols="12" class="py-3 px-5 justify-center">
								<v-card-title> 我的任务列表</v-card-title>
								<v-card-subtitle>已创建的任务数量:</v-card-subtitle>
								<v-card-actions>
									<v-btn text>
										创建任务
									</v-btn>
								</v-card-actions>
							</v-card>
						</v-col>
					</v-row>
				</v-col>
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
export default class TaskAdmin extends Vue {
	chart = false

	items = [
		{
			src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg'
		},
		{
			src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg'
		},
		{
			src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg'
		},
		{
			src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg'
		}
	]

	mounted() {
		this.chart = true
	}
}
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
