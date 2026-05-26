import { messagesSearch, type MessagesSearchData } from '@/shared/api';
import { useQuery } from '@tanstack/vue-query';
import type { Ref } from 'vue';
import { messageKeys } from './message.keys';

export function useMessageSearchQuery(
	chat: Ref<MessagesSearchData['path']['chat']>,
	searchQuery: Ref<MessagesSearchData['query']['q']>,
) {
	return useQuery({
		enabled: !!searchQuery.value,

		queryKey: messageKeys.search(chat, searchQuery).queryKey,

		queryFn: async () => {
			const result = await messagesSearch({
				path: { chat: chat.value },
				query: { q: searchQuery.value },
			});

			if (result.error) {
				throw result.error;
			}

			return result.data;
		},
	});
}
