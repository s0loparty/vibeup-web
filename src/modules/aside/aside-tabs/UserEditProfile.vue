<script setup lang="ts">
import BaseAvatar from '@/app/components/base/BaseAvatar.vue';
import BaseInput from '@/app/components/base/BaseInput.vue';
import BaseTextarea from '@/app/components/base/BaseTextarea.vue';
import { useUpdateUserMutation } from '@/app/query/user/useUpdateUserMutation';
import { useAuthStore } from '@/app/stores/useAuthStore';
import { watchDebounced } from '@vueuse/core';
import { ImagePlusIcon } from 'lucide-vue-next';
import { reactive, watch } from 'vue';
import TabTitle from './TabTitle.vue';

const { mutate: updateUser } = useUpdateUserMutation();
const authStore = useAuthStore();

const form = reactive({
	username: '',
	bio: '',
});

watchDebounced(
	() => [form.username, form.bio],
	([newUserName, newBio]) => {
		const user = authStore.user;
		if (!user) return;

		if (user.username !== newUserName || user.bio !== newBio) {
			updateUser({
				username: newUserName,
				bio: newBio,
			});
		}
	},
	{ debounce: 2000 },
);

watch(
	() => authStore.user,
	(newUser) => {
		if (!newUser) return;

		form.username = newUser?.username || '';
		form.bio = newUser?.bio || '';
	},

	{ immediate: true },
);
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
