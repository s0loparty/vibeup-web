<script setup lang="ts">
import BaseDialog from '@/app/components/base/BaseDialog.vue';
import BaseInput from '@/app/components/base/BaseInput.vue';
import BaseNavButton from '@/app/components/base/BaseNavButton.vue';
import { ScrollArea } from '@/app/components/ui/scroll-area';
import { useScrollHander } from '@/shared/utils/useScrollHandler.ts';
import { LoaderIcon, PlusIcon } from 'lucide-vue-next';
import { ref } from 'vue';
import { useUserChatList } from '../composables/useUserChatList.ts';
import TabTitle from './TabTitle.vue';
import UserBlockedListItem from './UserBlockedListItem.vue';
import UserChatListSkeleton from './UserChatListSkeleton.vue';
import UserProbBlockedList from './UserPrivacyProbBlacklist.vue';

const searchToBlock = ref('');
const {
	error,
	isError,
	isFetchingNextPage,
	hasNextPage,
	chats,
	fetchNextPage,
	status,
} = useUserChatList({ 'filter[type]': 'private' });
const { scrollHandler } = useScrollHander();
//TODO: сейчас тут в списке все юзеры которые из приватного чата
// А нужно что бы отображался список заблокированных
// в этом компоненте ниже есть диалоговое окно это добавить в блокировку тех кто еще не заблочен
</script>

<template>
	<div id="user-blocked" class="min-h-0 flex-1 overflow-hidden bg-white">
		<div class="flex h-full flex-col">
			<TabTitle title="Blocked Users" />
			<div class="bg-gray-300/60 p-4">
				<span class="text-black/50">
					Заблокированые пользователи не могут отпрвлять сообщения или добавлять
					в группу. Они не видят ваш профиль, фото, онлайн - статус и т.д.
				</span>
			</div>

			<div class="h-full min-h-0">
				<UserChatListSkeleton v-if="status === 'pending'" />
				<div v-if="isError" class="py-5 text-center text-xl text-red-400">
					{{ error?.message }}
				</div>
				<ScrollArea
					class="h-full"
					@scroll="
						scrollHandler(
							$event,
							fetchNextPage,
							hasNextPage,
							isFetchingNextPage,
							isError,
						)
					"
				>
					<ul class="bg-white">
						<UserBlockedListItem
							v-for="chat in chats"
							:key="chat.id"
							:chat="chat"
						/>
					</ul>
					<LoaderIcon
						v-if="isFetchingNextPage"
						class="mx-auto my-2.5 size-6 animate-spin text-brand-500"
					/>
				</ScrollArea>
			</div>
		</div>

		<BaseDialog>
			<template #trigger>
				<BaseNavButton :icon="PlusIcon" />
			</template>
			<template #title> <div>Block User</div> </template>
			<template #description>
				<div class="min-h-0 overflow-hidden pt-4">
					<BaseInput
						id="block-user"
						v-model="searchToBlock"
						label="User name"
						class="mb-4"
					/>
					<ScrollArea
						class="h-screen max-h-125 flex-1"
						@scroll="
							scrollHandler(
								$event,
								fetchNextPage,
								hasNextPage,
								isFetchingNextPage,
								isError,
							)
						"
					>
						<UserChatListSkeleton v-if="status === 'pending'" />
						<ul v-else>
							<UserProbBlockedList
								v-for="chat in chats"
								:key="chat.id"
								:chat="chat"
							/>
						</ul>
						<div v-if="isError" class="py-5 text-center text-xl text-red-400">
							{{ error?.message }}
						</div>
						<LoaderIcon
							v-if="isFetchingNextPage"
							class="mx-auto my-2.5 size-6 animate-spin text-brand-500"
						/>
					</ScrollArea>
				</div>
			</template>
		</BaseDialog>
	</div>
</template>
