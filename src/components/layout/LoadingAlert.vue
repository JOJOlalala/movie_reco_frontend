<template>
	<v-container grid-list-md text-xs-center>
		<v-layout align-space-between justify-center row fill-height>
			<v-flex xs12>
				<v-card flat class="py-5">
					<v-progress-circular color="primary" size="100" indeterminate />
					<p class="py-5">{{ info }}</p>
				</v-card>
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { route } from '@/api'

@Component
export default class LoadingAlert extends Vue {
	info = '正在加载数据'

	activated() {
		route('即将就绪', { hideNaviTitle: true })
		setTimeout(() => (this.info = '此次加载的耗时超过预期。我们建议你刷新本页面重试。'), 13000)
	}
}
</script>
