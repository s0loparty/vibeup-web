<script setup lang="ts">
import BaseAvatar from '@/app/components/base/BaseAvatar.vue';
import BaseInput from '@/app/components/base/BaseInput.vue';
import BaseTextarea from '@/app/components/base/BaseTextarea.vue';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/app/components/ui/dropdown-menu';
import { Skeleton } from '@/app/components/ui/skeleton';
import { useRemoveUserAvatarMutation } from '@/app/query/user/useRemoveUserAvatarMutation';
import { useAuthStore } from '@/app/stores/useAuthStore';
import { EllipsisVerticalIcon } from 'lucide-vue-next';
import { useUserEditProfile } from '../composables/useUserEditProfile';
import TabTitle from './TabTitle.vue';

const { isAvatarUpdate, waitUserAvatar, userAvatar, form, open } =
	useUserEditProfile();

const { mutate: removeAvatar, isPending: isRemovingAvatar } =
	useRemoveUserAvatarMutation();

const authStore = useAuthStore();
</script>

<template>
	<div class="h-screen bg-white">
		<div id="user-edit-profile">
			<div class="flex items-center justify-between">
				<TabTitle title="Edit Profile" />
				<DropdownMenu>
					<DropdownMenuTrigger class="mr-4 cursor-pointer">
						<EllipsisVerticalIcon class="size-6" />
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuItem @click="open()"
							>Загрузить аватар</DropdownMenuItem
						>
						<DropdownMenuItem
							class="text-red-500 focus:bg-red-100/50 focus:text-red-500"
							@click="removeAvatar"
							>Удалить аватар</DropdownMenuItem
						>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>

			<div>
				<div class="my-4 flex justify-center">
					<div class="flex size-30 items-center justify-center">
						<Skeleton
							class="mx-auto size-30 rounded-full"
							v-if="isAvatarUpdate || isRemovingAvatar || waitUserAvatar"
						/>
						<BaseAvatar
							v-else
							class="size-30 bg-gray-500/50 text-2xl text-white"
							:name="authStore.user?.username"
							:src="userAvatar?.thumbnail"
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
