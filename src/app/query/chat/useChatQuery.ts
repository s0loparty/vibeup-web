import { chatsIndex } from '@/shared/api';
import { useInfiniteQuery } from '@tanstack/vue-query';
import { AxiosError } from 'axios';
import { chatKeys } from './chat.keys';

export function useChatQuery() {
	return useInfiniteQuery({
		queryKey: chatKeys.list().queryKey,

		initialPageParam: '',

		refetchOnMount: false,

		queryFn: async ({ pageParam }) => {
			const result = await chatsIndex({ query: { cursor: pageParam } });

			if (result instanceof AxiosError) {
				throw result;
			}

			return result;
		},

		retry: false,

		getNextPageParam: (lastPage) => {
			return lastPage.data?.meta?.next_cursor || undefined;
		},

		getNextPageParam: (lastPage) => {
			return lastPage.data?.meta?.next_cursor || undefined;
		},
	});
}
