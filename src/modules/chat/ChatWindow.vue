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

// TODO members[0] не так работает как думали иногда там неверный юзер.
const member = computed(() => {
	if (!chat.value?.chat?.members) {
		return null;
	} else {
		return chat.value.chat.members[0];
	}
});

const membersGroup = computed(() => {
	if (!chat.value?.chat?.members) {
		return [];
	} else {
		return chat.value.chat.members;
	}
});

const isPrivateChat = computed(() => {
	return chat.value?.chat?.type === 'private';
});

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
			<ChatWindowHeader v-else-if="member && isPrivateChat" :member="member" />
			<!--тут для группового чата данные за место member-->
			<ChatWindowHeaderGroup
				v-else-if="member && !isPrivateChat"
				:members="membersGroup"
			/>
			<ChatWindowMessages />
			<ChatWindowFooter />
		</div>
	</section>
</template>
