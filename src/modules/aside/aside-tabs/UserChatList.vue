<script setup lang="ts">
import { ScrollArea } from '@/app/components/ui/scroll-area';
import { useChatQuery } from '@/app/query/chat/useChatQuery';
import { useAppMenuStore } from '@/app/stores/useAppMenuStore';
import AsideNavHeader from '@/modules/aside/components/AsideNavHeader.vue';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import UserChatListItem from './UserChatListItem.vue';
import UserChatListSkeleton from './UserChatListSkeleton.vue';

const { showAside } = storeToRefs(useAppMenuStore());
const {
	data: pages,
	fetchNextPage,
	status,
	isFetchingNextPage,
} = useChatQuery();

const chats = computed(() => {
	console.log(pages.value);
	return pages.value?.pages.flatMap((p) => p.data?.data ?? []) ?? [];
});

function scrollHandler(event: Event) {
	const el = event.target as HTMLElement;

	if (!el) return;
	if (isFetchingNextPage.value) return;

	const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;

	if (distanceFromBottom < 700) {
		fetchNextPage();
	}
}
</script>

<template>
	<div id="user-chat-list" class="min-h-0 flex-1 overflow-hidden">
		<AsideNavHeader />

		<!-- TODO: ВОЗМОЖНО ДОБАВИТЬ ЛОАДЕР КАКОЙ-ТО ПРИ ПОДГРУЗКЕ -->
		<ScrollArea
			class="h-[calc(100%-56px)] flex-1"
			:class="status === 'pending' ? 'pointer-events-none' : ''"
			ref="viewportRef"
			@scroll="scrollHandler"
		>
			<div>
				<UserChatListSkeleton v-if="status === 'pending'" />
				<ul class="bg-white px-2.5" @click="showAside = false">
					<UserChatListItem v-for="chat in chats" :key="chat.id" :chat />
				</ul>
			</div>
		</ScrollArea>
	</div>
</template>
