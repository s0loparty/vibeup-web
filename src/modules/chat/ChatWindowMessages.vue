<script setup lang="ts">
import BaseScrollButton from '@/app/components/base/BaseScrollButton.vue';
import { ScrollArea } from '@/app/components/ui/scroll-area';
import { useScrollMessagesHandler } from '@/shared/utils/useScrollMessagesHandler.ts';
import { computed, nextTick, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

import { useMessageSearchInput } from '../messages/composables/useMessageSearchInput.ts';
import { useChatMessagesStore } from '../messages/stores/useChatMessagesStore.ts';
import ChatWindowMessagesItem from './ChatWindowMessagesItem.vue';
import ChatWindowMessagesSkeleton from './ChatWindowMessagesSkeleton.vue';
import { useChatMessagesData } from './composables/useChatMessagesData';
import { useChatMessagesVirtualizer } from './composables/useChatMessagesVirtualizer';
import { useMessageScroll } from './composables/useMessageScroll';
import { useStickyDate } from './composables/useStickyDate';

const chatMessagesStore = useChatMessagesStore();

const scrollViewportRef = ref<HTMLElement | null>(null);
const highlightedMessageId = ref<number | null>(null);
let initializedChatId: number | null = null;

function setScrollViewportRef(el: HTMLElement | null) {
	scrollViewportRef.value = el;
}

const route = useRoute<'chat-window'>();

const chatId = computed(() => Number(route.params.id));

const messageScroll = useMessageScroll(chatId);
const scrollMessagesHandler = useScrollMessagesHandler(scrollViewportRef);

const {
	contextIsPending,
	contextMessage,
	contextFetchNextPage,
	contextIsFetchingNextPage,
	contextHasNextPage,
	contextIsError,
} = useMessageSearchInput();

const { virtualRowsData, messageIndexById } = useChatMessagesData({
	isContext: computed(() => chatMessagesStore.isContext),
	contextMessage,
	messagesList: computed(() => messageScroll.messagesList.value),
});

const {
	rowVirtualizer,
	virtualRows,
	totalSize,
	measureRowElement,
	scrollToBottom: scrollToBottomBase,
} = useChatMessagesVirtualizer({
	scrollViewportRef,
	virtualRowsData,
});

const { stickyDate } = useStickyDate({
	scrollViewportRef,
	virtualRowsData,
	getVirtualItems: () => rowVirtualizer.value.getVirtualItems(),
});

function scrollToBottom(behavior: ScrollBehavior = 'auto') {
	scrollToBottomBase(behavior);
}

function messagesHandler(e: Event) {
	scrollMessagesHandler.scrollHandler(
		e,
		messageScroll.fetchNextPage,
		messageScroll.hasNextPage.value,
		messageScroll.isFetchingNextPage.value,
		messageScroll.isError.value,
	);

	scrollMessagesHandler.updateScrollButton(e);
}

function contextHandler(e: Event) {
	scrollMessagesHandler.scrollHandler(
		e,
		contextFetchNextPage,
		contextHasNextPage.value,
		contextIsFetchingNextPage.value,
		contextIsError.value,
	);

	scrollMessagesHandler.updateScrollButton(e);
}

watch(
	[
		chatId,
		scrollViewportRef,
		() => virtualRowsData.value.length,
		messageScroll.isPending,
	],
	async ([id, viewport, length, pending]) => {
		if (
			!viewport ||
			!length ||
			pending ||
			chatMessagesStore.isContext ||
			initializedChatId === id
		)
			return;
		await nextTick();
		if (chatId.value !== id || scrollViewportRef.value !== viewport) return;
		scrollToBottom();
		initializedChatId = id;
		scrollMessagesHandler.isAutoScrolling.value = false;
		scrollMessagesHandler.updateScrollButton();
	},
	{ flush: 'post' },
);

watch(chatId, () => {
	initializedChatId = null;
	scrollMessagesHandler.resetScroll();
	highlightedMessageId.value = null;
	chatMessagesStore.setIsContext(false);
	chatMessagesStore.setContextMessageId(null);
});

watch(
	[
		() => chatMessagesStore.contextScrollTick,
		() => contextMessage.value?.pages[0],
		scrollViewportRef,
	],
	async () => {
		const messageId = chatMessagesStore.contextMessageId;
		const page = contextMessage.value?.pages[0];
		if (!messageId || !page || page.target_message_id !== messageId) return;

		chatMessagesStore.setIsContext(true);
		await nextTick();
		const index = messageIndexById.value.get(messageId);
		if (index === undefined || !scrollViewportRef.value) return;
		rowVirtualizer.value.scrollToIndex(index, {
			align: 'center',
			behavior: 'auto',
		});
		scrollMessagesHandler.isAutoScrolling.value = false;
		highlightedMessageId.value = messageId;
		window.setTimeout(() => {
			if (highlightedMessageId.value === messageId)
				highlightedMessageId.value = null;
		}, 2000);
	},
);
</script>

<template>
	<div class="relative min-h-0 flex-1 overflow-hidden">
		<div
			v-if="
				messageScroll.isPending.value ||
				(chatMessagesStore.isContext && contextIsPending)
			"
			class="mx-auto max-w-175 space-y-3 p-4 pt-0"
		>
			<ChatWindowMessagesSkeleton />
		</div>

		<ScrollArea
			v-else
			:viewport-ref="setScrollViewportRef"
			class="relative h-full"
			@scroll="
				chatMessagesStore.isContext
					? contextHandler($event)
					: messagesHandler($event)
			"
		>
			<div
				v-if="stickyDate"
				class="pointer-events-none absolute top-2 left-1/2 z-5 -translate-x-1/2 rounded-lg bg-black/75 px-2 py-1 text-sm whitespace-nowrap text-white"
			>
				{{ stickyDate }}
			</div>

			<div
				v-if="scrollMessagesHandler.isLoadingOlder.value"
				class="pointer-events-none absolute top-10 z-10 w-full py-2 text-center text-gray-400"
			>
				Загрузка старых сообщений...
			</div>

			<div
				:style="{
					height: `${totalSize}px`,
					position: 'relative',
					width: '100%',
				}"
			>
				<div
					v-for="virtualRow in virtualRows"
					:key="virtualRow.key"
					:data-index="virtualRow.index"
					:ref="measureRowElement"
					class="absolute top-0 left-0 w-full"
					:style="{
						transform: `translateY(${virtualRow.start}px)`,
					}"
				>
					<template v-if="virtualRow.row?.type === 'date'">
						<div class="mx-auto max-w-175 px-4 pt-2 pb-3">
							<div
								class="mx-auto w-min rounded-lg bg-black/75 px-2 py-1 text-sm whitespace-nowrap text-white"
							>
								{{ virtualRow.row.date }}
							</div>
						</div>
					</template>

					<template v-else-if="virtualRow.row?.type === 'message'">
						<div
							class="mx-auto max-w-175 px-4 pb-3 transition-colors"
							:class="{
								'rounded-lg bg-brand-500/30':
									highlightedMessageId === virtualRow.row.message.id,
							}"
						>
							<ChatWindowMessagesItem :message="virtualRow.row.message" />
						</div>
					</template>
				</div>
			</div>
		</ScrollArea>

		<BaseScrollButton
			v-if="scrollMessagesHandler.showScrollBtn.value"
			@click="scrollToBottom('smooth')"
		/>
	</div>
</template>
