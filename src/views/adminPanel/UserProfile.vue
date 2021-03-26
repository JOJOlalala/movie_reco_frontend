<template>
	<div class="pa-4">
		<v-sheet color="transparent">
			<v-row>
				<v-col cols="12">
					<v-card class="pa-8">
						<v-card-title>
							个人信息
						</v-card-title>
						<v-card-text>
							<p>用户名：{{ $store.state.currentUser.userName }}</p>
							<v-textarea
								outlined
								name="input-7-4"
								no-resize
								label="个人简介"
								v-model="newBio"
							></v-textarea>
						</v-card-text>
						<v-card-actions
							><v-btn outlined @click="uploadBio" :disabled="oldBio === newBio">修改个人简介</v-btn>
						</v-card-actions>
					</v-card>
					<v-card class="pa-8 mt-4">
						<v-card-title>
							头像
						</v-card-title>
						<v-card-text>
							<v-avatar size="140">
								<img :src="this.$store.state.currentUser.profile.avatar" alt="Your Avatar" />
							</v-avatar>
						</v-card-text>
						<v-card-actions>
							<v-file-input
								:rules="avatarRules"
								accept="image/png, image/jpeg, image/bmp,image/jpg"
								placeholder="Pick an avatar"
								prepend-icon="mdi-camera"
								label="上传头像（接受png、jpeg、bmp格式）"
								outlined
								show-size
								hide-details
								class="mr-4"
								v-model="avatarImg"
							></v-file-input>
							<v-btn outlined @click="uploadAvatar" x-large :disabled="avatarImg == null"
								>上传<v-icon right dark>
									mdi-cloud-upload-outline
								</v-icon></v-btn
							>
						</v-card-actions>
					</v-card>
				</v-col>
			</v-row>
		</v-sheet>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { User } from '@/api'

@Component
export default class UserProfile extends Vue {
	chart = false
	avatarImg: any = null
	avatarRules = [
		(value: any) => !value || value.size < 2000000 || 'Avatar size should be less than 2 MB!'
	]
	oldBio =
		'The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through.'
	newBio =
		'The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through.'
	created() {
		this.initialize()
	}
	initialize() {
		this.oldBio = this.$store.state.currentUser.profile.bio
		this.newBio = this.oldBio
	}
	mounted() {
		this.chart = true
	}

	async uploadAvatar() {
		const formData = new FormData()
		const avatar = this.avatarImg
		// files
		if (this.avatarImg) {
			formData.append('avatar', avatar)
		}
		// additional data
		formData.append('bio', this.oldBio)
		// for (const pair of formData.entries()) {
		// 	console.log(pair[0] + ', ' + pair[1])
		// }
		await User.updateUserProfile(formData)
		await User.updateUserProfileInStore()
		this.initialize()
	}

	async uploadBio() {
		const formData = new FormData()
		formData.append('bio', this.newBio)
		await User.updateUserProfile(formData)
		await User.updateUserProfileInStore()
		this.initialize()
	}
}
</script>
