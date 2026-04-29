<script setup lang="ts">
import BaseScrollButton from '@/app/components/base/BaseScrollButton.vue';
import { ScrollArea } from '@/app/components/ui/scroll-area';
import { useChatScroll } from '@/modules/chat/composables/useChatScroll';
import { computed, nextTick, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import ChatWindowMessagesItem from './ChatWindowMessagesItem.vue';
import { useMessageScroll } from './composables/useMessageScroll';

const scrollAreaRef = ref<InstanceType<typeof ScrollArea> | null>(null);
const { showScrollBtn, scrollToBottom, handleScroll } =
	useChatScroll(scrollAreaRef);

const route = useRoute<'chat-window'>();
const chatId = computed(() => {
	return Number(route.params.id);
});

const messageScroll = useMessageScroll(chatId);

// При первой загрузке или смене чата скроллим вниз
watch(
	() => messageScroll.messagesList.value.length,
	async (newLen, oldLen) => {
		if (newLen && oldLen === 0) {
			// Первая загрузка сообщений
			await nextTick();
			scrollToBottom();
			messageScroll.isAutoScrolling.value = false;
		}
	},
);

// Сбрасываем состояние при смене чата
watch(chatId, async (newId, oldId) => {
	if (newId !== oldId) {
		messageScroll.resetScroll();
		await nextTick();
		scrollToBottom();
		messageScroll.isAutoScrolling.value = false;
	}
});
</script>

<template>
	<div class="relative min-h-0 flex-1 overflow-hidden">
		<ScrollArea
			@scroll="
				(e: Event) => {
					messageScroll.scrollHandler(e);
					handleScroll(e);
				}
			"
			ref="scrollAreaRef"
			class="relative h-full"
		>
			<div class="chat mx-auto max-w-175 space-y-3 p-4">
				<!-- Индикатор загрузки сверху -->
				<div
					v-if="messageScroll.isLoadingOlder.value"
					class="py-2 text-center text-gray-400"
				>
					Загрузка старых сообщений...
				</div>

				<ChatWindowMessagesItem
					v-for="message in messageScroll.messagesList.value"
					:key="message.id"
					:message="message"
				/>
			</div>
		</ScrollArea>
		<BaseScrollButton v-if="showScrollBtn" @click="scrollToBottom" />
	</div>
</template>
