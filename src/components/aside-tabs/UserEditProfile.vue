<script setup lang="ts">
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ImagePlusIcon } from 'lucide-vue-next';
import { reactive } from 'vue';
import BaseInput from '../base/BaseInput.vue';
import BaseTextarea from '../base/BaseTextarea.vue';
import TabTitle from './TabTitle.vue';

const form = reactive({ name: '', lastName: '', username: '', bio: '' });
</script>

<template>
	<div class="bg-white">
		<div id="user-edit-profile">
			<TabTitle title="Edit Profile" />

			<div>
				<div class="my-4 flex justify-center">
					<div class="group relative">
						<button class="block cursor-pointer">
							<Avatar class="size-30">
								<AvatarImage
									class="brightness-50"
									src="https://github.com/shadcn.png"
									alt="@shadcn"
								/>
								<AvatarFallback>CN</AvatarFallback>
							</Avatar>
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
