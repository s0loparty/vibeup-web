<script setup lang="ts">
import BaseAvatar from '@/app/components/base/BaseAvatar.vue';
import BaseInput from '@/app/components/base/BaseInput.vue';
import Button from '@/app/components/ui/button/Button.vue';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/app/components/ui/dropdown-menu';
import { Skeleton } from '@/app/components/ui/skeleton';
import { useRemoveUserAvatarMutation } from '@/app/query/user/useRemoveUserAvatarMutation';
import { CircleUserRoundIcon, EllipsisVerticalIcon } from 'lucide-vue-next';
import { ref } from 'vue';
import { useUserEditProfile } from '../composables/useUserEditProfile';
import TabTitle from './TabTitle.vue';

const groupName = ref('');

const { isAvatarUpdate, waitUserAvatar, userAvatar, open } =
	useUserEditProfile();

const { mutate: removeAvatar, isPending: isRemovingAvatar } =
	useRemoveUserAvatarMutation();
//TODO: НАДО СДЕЛАТЬ ХРАНИЛИЩЕ ДЛЯ АВАТАРОК ГРУППОВЫХ ЧАТОВ
// И ДЛЯ НИХ УЖЕ МУТАЦИИ ЮЗАТЬ И ТАК ДАЛЕЕ
</script>

<template>
	<div class="h-screen bg-white">
		<div>
			<div class="flex items-center justify-between">
				<TabTitle title="Новая группа" />
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
						<CircleUserRoundIcon
							v-else-if="!userAvatar?.thumbnail"
							class="mx-auto size-30 text-brand-400"
						/>
						<BaseAvatar
							v-else
							class="size-30 brightness-50"
							:src="userAvatar.thumbnail"
						/>
					</div>
				</div>

				<div class="space-y-4 px-4 pb-4">
					<BaseInput
						v-model="groupName"
						label="Название группы"
						id="group-name"
					/>
					<Button
						class="mx-auto block h-auto w-full rounded-lg bg-brand-500 text-lg text-white transition-all duration-200 hover:bg-brand-400"
					>
						Создать группу
					</Button>
				</div>
			</div>
		</div>
	</div>
</template>
