import { messagesSearch, type MessagesSearchData } from '@/shared/api';
import { useInfiniteQuery } from '@tanstack/vue-query';
import type { Ref } from 'vue';
import { messageKeys } from './message.keys';

export function useMessageSearchInfiniteQuery(
	chat: Ref<MessagesSearchData['path']['chat']>,
	searchQuery: Ref<MessagesSearchData['query']['q']>,
) {
	return useInfiniteQuery({
		initialPageParam: 1,
		enabled: !!searchQuery.value,

		queryKey: messageKeys.search(chat, searchQuery).queryKey,

		queryFn: async ({ pageParam }) => {
			const result = await messagesSearch({
				path: { chat: chat.value },
				query: { q: searchQuery.value, page: pageParam },
			});

			if (result.error) {
				throw result.error;
			}

			return result.data;
		},

		getNextPageParam: (lastPage) => {
			if (
				lastPage?.current_page &&
				lastPage.last_page &&
				lastPage.current_page < lastPage.last_page
			) {
				return lastPage.current_page + 1;
			}
			return undefined;
		},
	});
}
