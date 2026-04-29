import type { MessagesIndexData } from '@/shared/api';
import { createQueryKeys } from '@lukemorales/query-key-factory';

export const messageKeys = createQueryKeys('messages', {
	list: (chatId: MessagesIndexData['path']['chatId']) => ['list', chatId],
});
