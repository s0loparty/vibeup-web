import type { MessagesIndexData, MessagesSearchData } from '@/shared/api';
import { createQueryKeys } from '@lukemorales/query-key-factory';
import type { Ref } from 'vue';

export const messageKeys = createQueryKeys('messages', {
	list: (chatId: MessagesIndexData['path']['chatId']) => ['list', chatId],
	search: (
		chatId: Ref<MessagesSearchData['path']['chat']>,
		searchQuery: Ref<MessagesSearchData['query']['q']>,
	) => ['search', chatId, searchQuery],
});
