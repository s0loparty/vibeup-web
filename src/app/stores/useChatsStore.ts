import { useIDBKeyval } from '@vueuse/integrations/useIDBKeyval';
import { defineStore } from 'pinia';
import type { ChatWithLastMessage } from '../types/api';

export const useChatsStore = defineStore('chats', () => {
	const { data: chats } = useIDBKeyval<ChatWithLastMessage[] | null>(
		'chats-store',
		null,
	);

	function setChats(newChats: ChatWithLastMessage[]) {
		chats.value = newChats;
	}

	return { chats, setChats };
});
