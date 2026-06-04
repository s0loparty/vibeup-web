<script setup lang="ts">
import BaseInput from '@/app/components/base/BaseInput.vue';
import { ScrollArea } from '@/app/components/ui/scroll-area';
import { useScrollHander } from '@/shared/utils/useScrollHandler.ts';
import { LoaderIcon } from 'lucide-vue-next';
import { ref } from 'vue';
import { useUserChatList } from '../composables/useUserChatList.ts';
import TabTitle from './TabTitle.vue';
import UserBlockedListItem from './UserBlockedListItem.vue';
import UserChatListSkeleton from './UserChatListSkeleton.vue';

const privateSearch = ref('');
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
</script>

<template>
	<div class="min-h-0 flex-1 overflow-hidden bg-white">
		<div class="flex h-full flex-col">
			<TabTitle title="Новый чат" />
			<div class="mb-2.5 bg-white p-4">
				<BaseInput id="create-private" label="Найти" v-model="privateSearch" />
			</div>
			<div class="flex-1 overflow-hidden">
				<UserChatListSkeleton v-if="status === 'pending'" />
				<div v-if="isError" class="py-5 text-center text-xl text-red-400">
					{{ error?.message }}
				</div>
				<ScrollArea
					v-else
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
	</div>
</template>
