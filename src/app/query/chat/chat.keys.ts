import type { ChatsIndexData, ChatsShowData } from '@/shared/api';
import { createQueryKeys } from '@lukemorales/query-key-factory';

export const chatKeys = createQueryKeys('chat', {
	list: (options?: ChatsIndexData['query']) => ({
		queryKey: ['list', options],
	}),

	show: (chatId: ChatsShowData['path']['chat']) => ({
		queryKey: ['show', chatId],
	}),
});
