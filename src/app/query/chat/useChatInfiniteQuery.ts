import { chatsIndex, type ChatsIndexData } from '@/shared/api';
import { useInfiniteQuery } from '@tanstack/vue-query';
import { AxiosError } from 'axios';
import { chatKeys } from './chat.keys';

export function useChatInfiniteQuery(options?: ChatsIndexData['query']) {
	return useInfiniteQuery({
		queryKey: chatKeys.list(options).queryKey,

		initialPageParam: '',
		staleTime: Infinity,
		gcTime: Infinity,
		refetchOnMount: false,
		refetchOnWindowFocus: false,

		queryFn: async ({ pageParam }) => {
			const result = await chatsIndex({
				query: { cursor: pageParam, ...options },
			});

			if (result instanceof AxiosError) {
				throw result;
			}

			return result;
		},

		getNextPageParam: (lastPage) => {
			return lastPage.data?.meta?.next_cursor || undefined;
		},
	});
}
