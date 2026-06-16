<script setup lang="ts">
import { useChatShowQuery } from '@/app/query/chat/useChatShowQuery';
import router from '@/app/router';
import { computed, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import ChatWindowFooter from './ChatWindowFooter.vue';
import ChatWindowHeader from './ChatWindowHeader.vue';
import ChatWindowHeaderGroup from './ChatWindowHeaderGroup.vue';
import ChatWindowHeaderSkeleton from './ChatWindowHeaderSkeleton.vue';
import ChatWindowMessages from './ChatWindowMessages.vue';
import ChatWindowWallpaper from './ChatWindowWallpaper.vue';

const route = useRoute<'chat-window'>();

const chatId = computed(() => {
	return Number(route.params.id);
});

const { data: chat, isFetching } = useChatShowQuery(chatId);

const isPrivateChat = computed(() => chat.value?.type === 'private');

watchEffect(() => {
	if (!chatId.value) {
		router.push({ name: 'main' });
	}
});
</script>

<template>
	<section
		class="user__chat box-r flex h-screen w-full flex-col border-r border-gray-200/50"
	>
		<div class="flex h-full flex-col">
			<ChatWindowWallpaper />

			<ChatWindowHeaderSkeleton v-if="isFetching" />

			<template v-else-if="chat">
				<ChatWindowHeader v-if="isPrivateChat" :chat="chat" />
				<ChatWindowHeaderGroup v-else :chat="chat" />
			</template>

			<ChatWindowMessages />
			<ChatWindowFooter />
		</div>
	</section>
</template>
