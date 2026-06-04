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
import { useMessageScroll } from './composables/useMessageScroll';

const chatMessagesStore = useChatMessagesStore();

const scrollAreaRef = ref<InstanceType<typeof ScrollArea> | null>(null);
const messageRefs = ref<HTMLElement[] | null>(null);

const route = useRoute<'chat-window'>();
const chatId = computed(() => {
	return Number(route.params.id);
});

const messageScroll = useMessageScroll(chatId);
const scrollMessagesHandler = useScrollMessagesHandler(scrollAreaRef);
const {
	contextIsPending,
	contextMessage,
	contextFetchNextPage,
	contextIsFetchingNextPage,
	contextHasNextPage,
	contextIsError,
} = useMessageSearchInput();

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

// При первой загрузке или смене чата скроллим вниз
watch(
	() => Object.values(messageScroll.messagesList.value).length,
	async (newLen, oldLen) => {
		if (newLen && oldLen === 0) {
			await nextTick();
			scrollMessagesHandler.scrollToBottom();
			scrollMessagesHandler.isAutoScrolling.value = false;
		}
	},
);

// Сбрасываем состояние при смене чата
watch(chatId, async (newId, oldId) => {
	if (newId !== oldId) {
		scrollMessagesHandler.resetScroll();
		await nextTick();
		scrollMessagesHandler.scrollToBottom();
		scrollMessagesHandler.isAutoScrolling.value = false;
		chatMessagesStore.setIsContext(false);
		chatMessagesStore.setContextMessageId(null);
	}
});

//watcher html
watch(
	[() => chatMessagesStore.contextScrollTick, contextMessage],

	async () => {
		chatMessagesStore.setIsContext(true);

		await nextTick();

		const finedElem = messageRefs.value?.find(
			(e) =>
				Number(e.getAttribute('data-message-id')) ===
				chatMessagesStore.contextMessageId,
		);

		//TODO: Вынести стиль глобально красиво
		finedElem?.classList.add(...['bg-brand-500/30', 'rounded-lg']);
		setTimeout(
			() => finedElem?.classList.remove(...['bg-brand-500/30', 'rounded-lg']),
			2000,
		);

		finedElem?.scrollIntoView({
			behavior: 'smooth',
			block: 'center',
		});
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
			@scroll="
				chatMessagesStore.isContext
					? contextHandler($event)
					: messagesHandler($event)
			"
			ref="scrollAreaRef"
			class="relative h-full"
		>
			<div>
				<!-- Индикатор загрузки сверху -->
				<div
					v-if="scrollMessagesHandler.isLoadingOlder.value"
					class="py-2 text-center text-gray-400"
				>
					Загрузка старых сообщений...
				</div>

				<div
					v-for="(group, index) in messageScroll.messagesList.value"
					:key="index"
					class="mx-auto max-w-175 space-y-3 p-4 pt-0"
				>
					<!--mark time-->
					<div
						class="sticky top-2 mx-auto w-min rounded-lg bg-black/75 px-2 py-1 text-sm text-white"
					>
						{{ index }}
					</div>

					<div
						v-for="message in group"
						:key="message.id"
						ref="messageRefs"
						:data-message-id="message.id"
					>
						<ChatWindowMessagesItem :message />
					</div>
				</div>
			</div>
		</ScrollArea>
		<BaseScrollButton
			v-if="scrollMessagesHandler.showScrollBtn.value"
			@click="scrollMessagesHandler.scrollToBottom"
		/>
	</div>
</template>
