<script setup lang="ts">
import { ScrollArea } from '@/app/components/ui/scroll-area';
import { useChatQuery } from '@/app/query/chat/useChatQuery';
import { useAppMenuStore } from '@/app/stores/useAppMenuStore';
import AsideNavHeader from '@/modules/aside/components/AsideNavHeader.vue';
import { LoaderIcon } from 'lucide-vue-next';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import UserChatListButton from './UserChatListButton.vue';
import UserChatListItem from './UserChatListItem.vue';
import UserChatListSkeleton from './UserChatListSkeleton.vue';

const { showAside } = storeToRefs(useAppMenuStore());

const {
	data: pages,
	fetchNextPage,
	status,
	isFetchingNextPage,
	isError,
	error,
} = useChatQuery();

const chats = computed(() => {
	return pages.value?.pages.flatMap((p) => p.data?.data ?? []) ?? [];
});

//TODO: ПЕРЕНЕСТИ ПОТОМ СКРОЛЛ ХАНДЛЕР в компосабл
function scrollHandler(event: Event) {
	const el = event.target as HTMLElement;

	if (isFetchingNextPage.value || !el || isError.value) return;

	const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;

	if (distanceFromBottom < 700) {
		fetchNextPage();
	}
}
</script>

<template>
	<div id="user-chat-list" class="min-h-0 flex-1 overflow-hidden">
		<AsideNavHeader />

		<ScrollArea
			class="h-[calc(100%-56px)] flex-1"
			:class="status === 'pending' ? 'pointer-events-none' : ''"
			ref="viewportRef"
			@scroll="scrollHandler"
		>
			<div>
				<UserChatListSkeleton v-if="status === 'pending'" />
				<div v-else-if="isError" class="py-5 text-center text-xl text-red-400">
					{{ error?.message }}
				</div>
				<ul v-else class="bg-white px-2.5" @click="showAside = false">
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
