<script setup lang="ts">
import { ImagePlusIcon } from 'lucide-vue-next';
import { reactive } from 'vue';
import BaseAvatar from '../base/BaseAvatar.vue';
import BaseInput from '../base/BaseInput.vue';
import BaseTextarea from '../base/BaseTextarea.vue';
import TabTitle from './TabTitle.vue';

const form = reactive({ name: '', lastName: '', username: '', bio: '' });
</script>

<template>
	<div class="h-screen bg-white">
		<div id="user-edit-profile">
			<TabTitle title="Edit Profile" />

			<div>
				<div class="my-4 flex justify-center">
					<div class="group relative">
						<button class="block cursor-pointer">
							<BaseAvatar
								class="size-30 brightness-50"
								name="Sueta"
								src="https://github.com/shadcn.png"
							/>
						</button>
						<ImagePlusIcon
							class="absolute top-1/2 left-1/2 size-13 -translate-1/2 cursor-pointer text-white transition-transform duration-200 group-hover:scale-120"
						/>
					</div>
				</div>

				<div class="space-y-4 px-4 pb-4">
					<BaseInput v-model="form.name" label="Name" id="name" />

					<BaseInput v-model="form.lastName" label="Last Name" id="lastName" />

					<BaseInput v-model="form.username" label="Username" id="username" />

					<BaseTextarea
						v-model.trim="form.bio"
						label="Bio (optional)"
						id="bio"
					/>
				</div>
			</div>
		</div>
	</div>
</template>
