<script setup lang="ts">
import { ScrollArea } from '@/app/components/ui/scroll-area';
import AsideNavHeader from '@/modules/aside/components/AsideNavHeader.vue';
import { useScrollHander } from '@/shared/utils/useScrollHandler.ts';
import { LoaderIcon } from 'lucide-vue-next';
import { useUserChatListScroll } from '../composables/useUserChatListScroll';
import UserChatListButton from './UserChatListButton.vue';
import UserChatListItem from './UserChatListItem.vue';
import UserChatListSkeleton from './UserChatListSkeleton.vue';

const {
	isError,
	isFetchingNextPage,
	status,
	error,
	chats,
	fetchNextPage,
	hasNextPage,
} = useUserChatListScroll();
const { scrollHandler } = useScrollHander();
</script>

<template>
	<div id="user-chat-list" class="min-h-0 flex-1 overflow-hidden">
		<AsideNavHeader />

		<ScrollArea
			class="h-[calc(100%-56px)] flex-1"
			:class="status === 'pending' ? 'pointer-events-none' : ''"
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
			<div>
				<UserChatListSkeleton v-if="status === 'pending'" />
				<div v-else-if="isError" class="py-5 text-center text-xl text-red-400">
					{{ error?.message }}
				</div>
				<ul v-else class="bg-white px-2.5">
					<UserChatListItem v-for="chat in chats" :key="chat.id" :chat />
				</ul>
				<UserChatListButton />
				<LoaderIcon
					v-if="isFetchingNextPage"
					class="mx-auto my-2.5 size-6 animate-spin text-brand-500"
				/>
			</div>
		</ScrollArea>
	</div>
</template>
