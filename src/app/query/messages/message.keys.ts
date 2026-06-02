import type {
	MessagesContextData,
	MessagesIndexData,
	MessagesSearchData,
	PublicMessage,
} from '@/shared/api';
import { createQueryKeys } from '@lukemorales/query-key-factory';
import type { Ref } from 'vue';

export const messageKeys = createQueryKeys('messages', {
	list: (chatId: MessagesIndexData['path']['chatId']) => ['list', chatId],
	search: (
		chatId: Ref<MessagesSearchData['path']['chat']>,
		searchQuery: Ref<MessagesSearchData['query']['q']>,
	) => ['search', chatId, searchQuery],
	searchContext: (
		chatId: Ref<MessagesContextData['path']['chat']>,
		messageId: Ref<PublicMessage['id'] | null>,
	) => ['searchContext', chatId, messageId],
});
