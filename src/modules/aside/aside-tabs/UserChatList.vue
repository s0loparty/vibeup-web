<script setup lang="ts">
import { ScrollArea } from '@/app/components/ui/scroll-area';
import { useChatQuery } from '@/app/query/chat/useChatQuery';
import { useAppMenuStore } from '@/app/stores/useAppMenuStore';
import { useChatsStore } from '@/app/stores/useChatsStore';
import AsideNavHeader from '@/modules/aside/components/AsideNavHeader.vue';
import { storeToRefs } from 'pinia';
import { watch } from 'vue';
import UserChatListItem from './UserChatListItem.vue';

const chatsStore = useChatsStore();

const { showAside } = storeToRefs(useAppMenuStore());
const { data: chats, isSuccess } = useChatQuery();

watch(isSuccess, (success) => {
	if (!success) return;
	chatsStore.setChats(chats.value?.data || []);
});
</script>

<template>
	<div id="user-chat-list" class="min-h-0 flex-1 overflow-hidden">
		<AsideNavHeader />

		<!-- TODO: ДОБАВИТЬ КУРСОРНУЮ ПАГИНАЦИЮ ЧАТОВ НА СКРОЛЛ -->
		<ScrollArea class="h-[calc(100%-56px)] flex-1">
			<ul class="bg-white px-2.5" @click="showAside = false">
				<UserChatListItem
					v-for="chat in chatsStore.chats"
					:key="chat.id"
					:chat
				/>
			</ul>
		</ScrollArea>
	</div>
</template>
