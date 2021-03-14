<template>
	<div id="app">
		<v-app>
			<keep-alive>
				<router-view />
			</keep-alive>
		</v-app>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class App extends Vue {}
</script>
