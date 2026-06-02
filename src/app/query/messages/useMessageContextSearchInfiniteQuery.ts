import {
	messagesContext,
	type MessagesSearchData,
	type PublicMessage,
} from '@/shared/api';
import { useInfiniteQuery } from '@tanstack/vue-query';
import type { Ref } from 'vue';
import { messageKeys } from './message.keys';

export function useMessageContextSearchInfiniteQuery(
	chatId: Ref<MessagesSearchData['path']['chat']>,
	messageId: Ref<PublicMessage['id'] | null>,
) {
	return useInfiniteQuery({
		initialPageParam: '',
		staleTime: Infinity,
		gcTime: Infinity,
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		enabled: !!chatId.value && !!messageId.value,

		queryKey: messageKeys.searchContext(chatId, messageId).queryKey,

		queryFn: async ({ pageParam }) => {
			if (!messageId.value) return;

			const result = await messagesContext({
				path: { chat: chatId.value, message: messageId.value },
				query: { limit: 30, ...(pageParam && { prev_cursor: pageParam }) },
			});

			if (result.error) {
				throw result.error;
			}

			return result.data;
		},

		getNextPageParam: (lastPage) => {
			return lastPage?.prev_cursor ?? undefined;
		},
	});
}
