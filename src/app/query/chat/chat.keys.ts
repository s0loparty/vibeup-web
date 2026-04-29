import type { ChatsShowData } from '@/shared/api';
import { createQueryKeys } from '@lukemorales/query-key-factory';

export const chatKeys = createQueryKeys('chat', {
	list: () => ({
		queryKey: ['list'],
	}),

	show: (chatId: ChatsShowData['path']['chat']) => ({
		queryKey: ['show', chatId],
	}),
});
